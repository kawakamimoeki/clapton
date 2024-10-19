class VideoComponent < Clapton::Component
  def render
    box = c(:div)
    box.add(c(:button).add(c(:text, @state.is_playing ? "Pause" : "Play"))).add_action(:click, :VideoState, :toggle_play)
    box.add(VideoPlayerComponent.new(url: @state.video_url, is_playing: @state.is_playing))
    box
  end
end
