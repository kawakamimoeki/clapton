class VideoPlayerComponent < Clapton::Component
  def render
    box = c(:div)
    box.add(c(:video, { id: "video", src: @state.url, loop: "loop", playsInline: "playsInline" }))
    box.add(c(:div, { id: "video-debug" }))
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
