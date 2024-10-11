import { describe, it, expect } from 'vitest'
import { htmlAttributes } from './html-attributes'

describe('htmlAttributes', () => {
  it("returns empty string if no params", () => {
    expect(htmlAttributes({})).toBe("")
  })

  it("returns attributes and data attributes", () => {
    expect(htmlAttributes({ id: "1", "data-foo": "bar" })).toBe(`id='1' data-foo='bar'`)
  })

  it('returns attributes and data attributes with custom data attributes', () => {
    expect(htmlAttributes({ id: '1', data: { foo: 'bar' } })).toBe(`id='1' data-foo='bar'`)
    expect(htmlAttributes({ id: '1', data: { foo: 'bar', baz: 'qux' } })).toBe(`id='1' data-foo='bar' data-baz='qux'`)
    expect(htmlAttributes({ id: '1', data: { foo: { baz: 'qux', quux: 'corge' } } })).toBe(`id='1' data-foo-baz='qux' data-foo-quux='corge'`)
  })

  it('returns disabled if disabled is false', () => {
    expect(htmlAttributes({ disabled: false })).toBe("")
    expect(htmlAttributes({ disabled: true })).toBe("disabled")
  })

  it('escapes html', () => {
    expect(htmlAttributes({ content: "<script>alert('xss')</script>" })).toBe(`content='&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;'`)
  })
})
