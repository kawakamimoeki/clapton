class VideoController < ApplicationController
  def index
    @components = [
      [:VideoComponent, { video_url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", is_playing: false }]
    ]
  end
end
