import { Clapton } from "components"

const bq = (...props: any[]) => {
  return new Clapton.BlockQuote(...props)
}

const box = (...props: any[]) => {
  return new Clapton.Box(...props)
}

const b = (...props: any[]) => {
  return new Clapton.Bold(...props)
}

const button = (...props: any[]) => {
  return new Clapton.Button(...props)
}

const check = (...props: any[]) => {
  return new Clapton.Checkbox(props[0], props[1], props[2])
}

const code = (...props: any[]) => {
  return new Clapton.Code(...props)
}

const datetime = (...props: any[]) => {
  return new Clapton.DateTimeField(props[0], props[1], props[2])
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

const h = (...props: any[]) => {
  return new Clapton.Heading(props[0], props[1])
}

const img = (...props: any[]) => {
  return new Clapton.Image(props[0], props[1], props[2])
}

const a = (...props: any[]) => {
  return new Clapton.Link(props[0], props[1])
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

const radio = (...props: any[]) => {
  return new Clapton.RadioButton(props[0], props[1], props[2])
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
  return new Clapton.TextField(props[0], props[1], props[2])
}

const text = (...props: any[]) => {
  return new Clapton.Text(props[0])
}

const c = (name: string, ...props: any[]) => {
  switch (name) {
    case "bq":
      return bq(...props)
    case "box":
      return box(...props)
    case "b":
      return b(...props)
    case "button":
      return button(...props)
    case "check":
      return check(...props)
    case "code":
      return code(...props)
    case "datetime":
      return datetime(...props)
    case "el":
      return el(...props)
    case "embed":
      return embed(...props)
    case "em":
      return em(...props)
    case "form":
      return form(...props)
    case "h":
      return h(...props)
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
    case "radio":
      return radio(...props)
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
      return new Clapton.Component(...props)
  }
}

export default c
