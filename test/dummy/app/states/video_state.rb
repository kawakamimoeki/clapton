class VideoState < Clapton::State
  attribute :is_playing

  def toggle_play(_)
    self.is_playing = !self.is_playing
  end
end
