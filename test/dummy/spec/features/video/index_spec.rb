require "rails_helper"

describe "Video Player", :js do
  it "renders the video player component" do
    visit "/video"
    expect(page).to have_content("Paused")
  end

  it "plays the video" do
    visit "/video"
    sleep 1
    click_on "Play"
    expect(page).to have_content("Playing")
  end
end
