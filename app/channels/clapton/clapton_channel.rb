module Clapton
  class ClaptonChannel < ApplicationCable::Channel
    def subscribed
      stream_from "clapton_channel"
    end

    def action(data)
      state = data["data"]["state"]["name"].constantize.new(JSON.parse(data["data"]["state"]["attributes"].to_json, symbolize_names: true))

      if state.respond_to?(data["data"]["state"]["action"])
        state.public_send(data["data"]["state"]["action"], JSON.parse(data["data"]["params"].to_json, symbolize_names: true)) do |options = {}|
          ActionCable.server.broadcast("clapton_channel", {
            status: "success",
            continue: options[:continue],
            stream: true,
            data: {
              component: {
                name: data["data"]["component"]["name"],
                id: data["data"]["component"]["id"],
              },
              state: state.to_h,
              focus: data["data"]["focus"] 
            }
          })
        end
        if state.errors.any?
          ActionCable.server.broadcast("clapton_channel", {
            status: "error",
            errors: state.errors,
            data: {
              component: {
                name: data["data"]["component"]["name"],
                id: data["data"]["component"]["id"],
              },
              state: state.to_h,
              focus: data["data"]["focus"]
            }
          })
          return
        end

        ActionCable.server.broadcast("clapton_channel", {
          status: "success",
          stream: false,
          continue: false,
          data: {
            component: {
              name: data["data"]["component"]["name"],
              id: data["data"]["component"]["id"],
            },
            state: state.to_h,
            focus: data["data"]["focus"]
          }
        })
      else
        ActionCable.server.broadcast("clapton_channel", {
          status: "error",
          message: "Invalid action",
          data: {
            component: {
              name: data["data"]["component"]["name"],
              id: data["data"]["component"]["id"],
            },
            state: state.to_h,
            focus: data["data"]["focus"]
          }
        })
      end
    end
  end
end
