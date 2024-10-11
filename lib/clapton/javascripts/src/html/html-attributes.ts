export const htmlAttributes = (params: Record<string, any>) => {
  const customDataAttributes = params.data || {}
  const others = Object.keys(params).filter(key => key !== "data")

  const flattenDataAttributes = (data: Record<string, any>, prefix = "data") => {
    return Object.keys(data).reduce((acc, key) => {
      const value = data[key]
      if (typeof value === "object" && value !== null) {
        acc.push(...flattenDataAttributes(value, `${prefix}-${key}`))
      } else {
        acc.push(`${prefix}-${key}='${escapeHtml(value)}'`)
      }
      return acc
    }, [] as string[])
  }

  return [
    others.map(key => {
      if (key === "disabled") {
        if (params[key] === false) {
          return ""
        } else {
          return `${key}`
        }
      }
      return `${key}='${escapeHtml(params[key])}'`
    }).join(" "),
    flattenDataAttributes(customDataAttributes).join(" ")
  ].filter(Boolean).join(" ")
}

const escapeHtml = (unsafe: string) => {
  if (typeof unsafe !== "string") {
    return ""
  }
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
