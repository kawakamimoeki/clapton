import { Clapton } from "components"

const blockquote = (...props: any[]) => {
  return new Clapton.BlockQuote(...props)
}

const div = (...props: any[]) => {
  return new Clapton.Div(...props)
}

const b = (...props: any[]) => {
  return new Clapton.Bold(...props)
}

const button = (...props: any[]) => {
  return new Clapton.Button(...props)
}

const code = (...props: any[]) => {
  return new Clapton.Code(...props)
}

const el = (...props: any[]) => {
  return new Clapton.Element(props[0], props[1])
}

const embed = (...props: any[]) => {
  return new Clapton.Embed(props[0])
}

const em = (...props: any[]) => {
  return new Clapton.Emphasis(...props)
}

const form = (...props: any[]) => {
  return new Clapton.Form(...props)
}

const h1 = (...props: any[]) => {
  return new Clapton.Heading(1, props[1])
}

const h2 = (...props: any[]) => {
  return new Clapton.Heading(2, props[1])
}

const h3 = (...props: any[]) => {
  return new Clapton.Heading(3, props[1])
}

const h4 = (...props: any[]) => {
  return new Clapton.Heading(4, props[1])
}

const h5 = (...props: any[]) => {
  return new Clapton.Heading(5, props[1])
}

const h6 = (...props: any[]) => {
  return new Clapton.Heading(6, props[1])
}

const img = (...props: any[]) => {
  return new Clapton.Image(props[0])
}

const a = (...props: any[]) => {
  return new Clapton.Link(props[0])
}

const li = (...props: any[]) => {
  return new Clapton.ListItem(...props)
}

const ul = (...props: any[]) => {
  return new Clapton.List(...props)
}

const ol = (...props: any[]) => {
  return new Clapton.OrderedList(...props)
}

const p = (...props: any[]) => {
  return new Clapton.Paragraph(...props)
}

const q = (...props: any[]) => {
  return new Clapton.Quote(...props)
}

const select = (...props: any[]) => {
  return new Clapton.Select(props[0], props[1], props[2])
}

const span = (...props: any[]) => {
  return new Clapton.Span(...props)
}

const textarea = (...props: any[]) => {
  return new Clapton.TextArea(props[0], props[1], props[2])
}

const input = (...props: any[]) => {
  return new Clapton.Input(props[0], props[1], props[2])
}

const text = (...props: any[]) => {
  return new Clapton.Text(props[0])
}

const c = (name: string, ...props: any[]) => {
  switch (name) {
    case "blockquote":
      return blockquote(...props)
    case "div":
      return div(...props)
    case "b":
      return b(...props)
    case "button":
      return button(...props)
    case "code":
      return code(...props)
    case "el":
      return el(...props)
    case "embed":
      return embed(...props)
    case "em":
      return em(...props)
    case "form":
      return form(...props)
    case "h1":
      return h1(...props)
    case "h2":
      return h2(...props)
    case "h3":
      return h3(...props)
    case "h4":
      return h4(...props)
    case "h5":
      return h5(...props)
    case "h6":
      return h6(...props)
    case "img":
      return img(...props)
    case "a":
      return a(...props)
    case "li":
      return li(...props)
    case "ul":
      return ul(...props)
    case "ol":
      return ol(...props)
    case "p":
      return p(...props)
    case "q":
      return q(...props)
    case "select":
      return select(...props)
    case "span":
      return span(...props)
    case "textarea":
      return textarea(...props)
    case "input":
      return input(...props)
    case "text":
      return text(...props)
    default:
      return new Clapton.Element(name, ...props)
  }
}

export { c }
