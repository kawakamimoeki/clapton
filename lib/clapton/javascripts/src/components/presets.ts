import { Clapton } from "components";

export class Presets {
  bq(...props: any[]) {
    return new Clapton.BlockQuote(...props)
  }

  box(...props: any[]) {
    return new Clapton.Box(...props)
  }

  b(...props: any[]) {
    return new Clapton.Bold(...props)
  }

  button(...props: any[]) {
    return new Clapton.Button(...props)
  }

  check(...props: any[]) {
    return new Clapton.Checkbox(props[0], props[1], props[2])
  }

  code(...props: any[]) {
    return new Clapton.Code(...props)
  }

  datetime(...props: any[]) {
    return new Clapton.DateTimeField(props[0], props[1], props[2])
  }

  el(...props: any[]) {
    return new Clapton.Element(props[0], props[1])
  }

  embed(...props: any[]) {
    return new Clapton.Embed(props[0])
  }

  em(...props: any[]) {
    return new Clapton.Emphasis(...props)
  }

  form(...props: any[]) {
    return new Clapton.Form(...props)
  }

  h(...props: any[]) {
    return new Clapton.Heading(props[0], props[1])
  }

  img(...props: any[]) {
    return new Clapton.Image(props[0], props[1])
  }

  a(...props: any[]) {
    return new Clapton.Link(props[0], props[1])
  }
  
  li(...props: any[]) {
    return new Clapton.ListItem(...props)
  }

  ul(...props: any[]) {
    return new Clapton.List(...props)
  }

  ol(...props: any[]) {
    return new Clapton.OrderedList(...props)
  }

  
  p(...props: any[]) {
    return new Clapton.Paragraph(...props)
  }
  
  q(...props: any[]) {
    return new Clapton.Quote(...props)
  }

  radio(...props: any[]) {
    return new Clapton.RadioButton(props[0], props[1], props[2])
  }
  
  select(...props: any[]) {
    return new Clapton.Select(props[0], props[1], props[2])
  }
  
  
  span(...props: any[]) {
    return new Clapton.Span(...props)
  }
  
  textarea(...props: any[]) {
    return new Clapton.TextArea(props[0], props[1], props[2])
  }
  
  input(...props: any[]) {
    return new Clapton.TextField(props[0], props[1], props[2])
  }

  text(...props: any[]) {
    return new Clapton.Text(props[0])
  }
}
