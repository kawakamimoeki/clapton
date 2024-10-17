class VideoPlayerComponent < Clapton::Component
  def render
    c(:embed, <<~HTML
      <video id="video" src="#{@state.url}" loop playsInline></video>
      <div id="video-debug"></div>
    HTML
    )
  end

  effect [:is_playing] do |state|
    if state[:is_playing]
      document.getElementById("video").play()
      document.getElementById("video-debug").innerHTML = "<p>Playing</p>"
    else
      document.getElementById("video").pause()
      document.getElementById("video-debug").innerHTML = "<p>Paused</p>"
    end
  end

  effect [] do
    document.getElementById("video-debug").innerHTML = "<p>Paused</p>"
  end
end
