module FuzzyHtmlAssertion
  def assert_fuzzy_html_equal(expected, actual, msg = nil)
    expected_normalized = normalize_html(expected)
    actual_normalized = normalize_html(actual)

    assert_equal(expected_normalized, actual_normalized, msg)
  end

  private

  def normalize_html(html)
    html
      .gsub(/\s+/, ' ')
      .gsub(/>\s+</, '><')
      .gsub(/"\s+/, '"')
      .gsub(/'/, "\"")
      .gsub(/\s+="/, '="')
      .gsub(/<!--.*?-->/m, '')
      .gsub(/<([^>]+)>/) { |m| m.downcase }
      .gsub(/\s\/>/, "/>")
      .strip
  end
end
