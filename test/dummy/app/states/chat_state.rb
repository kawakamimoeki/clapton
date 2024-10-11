class ChatState < Clapton::State
  attribute :messages

  def send(params)
    self.messages << { role: "user", content: params[:content] }
    yield continue: true

    client = OpenAI::Client.new(
      access_token: ENV.fetch("OPENAI_ACCESS_TOKEN"),
      log_errors: true
    )
    self.messages << { role: "assistant", content: "" }
    client.chat(
      parameters: {
        model: "gpt-4o-mini",
        messages: messages,
        stream: proc do |chunk, _bytesize|
          if chunk.dig("choices", 0, "finish_reason") == "stop"
            yield continue: false
          end

          self.messages.last[:content] << chunk.dig("choices", 0, "delta", "content")
          yield continue: true
        end
      }
    )
  end
end
