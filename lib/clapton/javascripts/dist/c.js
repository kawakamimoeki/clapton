const htmlAttributes = (params) => {
    const customDataAttributes = params.data || {};
    const others = Object.keys(params).filter(key => key !== "data");
    const flattenDataAttributes = (data, prefix = "data") => {
        return Object.keys(data).reduce((acc, key) => {
            const value = data[key];
            if (typeof value === "object" && value !== null) {
                acc.push(...flattenDataAttributes(value, `${prefix}-${key}`));
            }
            else {
                acc.push(`${prefix}-${key}='${escapeHtml(value)}'`);
            }
            return acc;
        }, []);
    };
    return [
        others.map(key => {
            if (key === "disabled") {
                if (params[key] === false) {
                    return "";
                }
                else {
                    return `${key}`;
                }
            }
            return `${key}='${escapeHtml(params[key])}'`;
        }).join(" "),
        flattenDataAttributes(customDataAttributes).join(" ")
    ].filter(Boolean).join(" ");
};
const escapeHtml = (unsafe) => {
    if (typeof unsafe !== "string") {
        return "";
    }
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

class BlockQuote {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<blockquote ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</blockquote>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Box {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
    get renderWrapper() {
        return `<div ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</div>`;
    }
    add_action(eventType, stateName, fnName, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${eventType}->${stateName}#${fnName}@${options.debounce || 0}`;
        return this;
    }
}

class Button {
    constructor(attributes = {}) {
        this.attributes = attributes;
        this.children = [];
    }
    add(child) {
        this.children.push(child);
        return this;
    }
    get renderWrapper() {
        return `<button ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</button>`;
    }
    add_action(event, klass, fn, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
        return this;
    }
}

class Bold {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<strong ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</strong>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Checkbox {
    constructor(state, attribute, attributes = {}) {
        this.state = state;
        this.attributes = attributes;
        this.attribute = attribute;
        this.attributes["data-attribute"] = attribute;
    }
    get renderWrapper() {
        return `<input type='checkbox' ${htmlAttributes(this.attributes)} value='${this.state[this.attribute] || ""}'/>`;
    }
    add_action(event, klass, fn, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
        return this;
    }
}

class Code {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<code ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</code>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class DateTimeField {
    constructor(state, attribute, attributes = {}) {
        this.attributes = {};
        this.state = state;
        this.attribute = attribute;
        this.attributes = attributes;
        this.attributes["data-attribute"] = attribute;
    }
    get renderWrapper() {
        const value = this.state[this.attribute] ? this.datetime_local_value(this.state[this.attribute]) : "";
        return `<input type='datetime-local' ${htmlAttributes(this.attributes)} value='${value}'/>`;
    }
    add_action(event, klass, fn, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
        return this;
    }
    datetime_local_value(value) {
        if (!value) {
            return "";
        }
        const date = new Date(value);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
    }
}

class Element {
    constructor(type, attributes = {}) {
        this.children = [];
        this.type = type;
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<${this.type} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</${this.type}>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Embed {
    constructor(html) {
        this.html = html;
    }
    get renderWrapper() {
        return this.html;
    }
}

class Emphasis {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<em ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</em>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Form {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<form ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</form>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Heading {
    constructor(level, attributes = {}) {
        this.children = [];
        this.level = level;
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<h${this.level} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</h${this.level}>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Image {
    constructor(src, alt, attributes = {}) {
        this.children = [];
        this.attributes = attributes;
        this.src = src;
        this.alt = alt;
    }
    get renderWrapper() {
        return `<img src='${this.src}' alt='${this.alt}' ${htmlAttributes(this.attributes)}/>`;
    }
}

class Link {
    constructor(href, attributes = {}) {
        this.children = [];
        this.attributes = attributes;
        this.href = href;
    }
    get renderWrapper() {
        return `<a href='${this.href}' ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</a>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class ListItem {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
    get renderWrapper() {
        return `<li ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</li>`;
    }
}

class List {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
    get renderWrapper() {
        return `<ul ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ul>`;
    }
}

class OrderedList {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
    get renderWrapper() {
        return `<ol ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ol>`;
    }
}

class Paragraph {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<p ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</p>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Quote {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<q ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</q>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class RadioButton {
    constructor(state, attribute, attributes = {}) {
        this.state = state;
        this.attributes = attributes;
        this.attribute = attribute;
        this.attributes["data-attribute"] = attribute;
    }
    get renderWrapper() {
        return `<input type='radio' ${htmlAttributes(this.attributes)} value='${this.state[this.attribute] || ""}'/>`;
    }
    add_action(event, klass, fn, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
        return this;
    }
}

class Select {
    constructor(options = [], state, attribute, attributes = {}) {
        this.children = [];
        this.options = options;
        this.state = state;
        this.attribute = attribute;
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<select ${htmlAttributes(this.attributes)}>${this.options.map(option => `<option value='${option.value}'${option.value === this.state[this.attribute] ? " selected" : ""}>${option.text}</option>`).join("")}${this.children.map(child => child.renderWrapper).join("")}</select>`;
    }
}

class Span {
    constructor(attributes = {}) {
        this.children = [];
        this.attributes = attributes;
    }
    get renderWrapper() {
        return `<span ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</span>`;
    }
    add(child) {
        this.children.push(child);
        return this;
    }
}

class Component {
    constructor(state = {}, id = Math.random().toString(36).substring(2, 10), errors = []) {
        this._state = state;
        this.id = id;
        this._errors = errors;
    }
    get render() {
        return new Box({});
    }
    get renderWrapper() {
        const root = this.render;
        if (root.attributes) {
            root.attributes = { ...root.attributes, data: { ...root.attributes.data, component: this.constructor.name, state: JSON.stringify(this._state), id: this.id, errors: this._errors } };
        }
        else {
            root.attributes = { data: { component: this.constructor.name, state: JSON.stringify(this._state), id: this.id, errors: this._errors } };
        }
        return root.renderWrapper;
    }
    static effect(dependencies, callback) {
        this._effects.push({ dependencies, callback });
    }
    get effects() {
        return this.constructor._effects;
    }
    runEffects() {
        this.effects.forEach((effect) => {
            if (effect.dependencies.some((dependency) => this._state[dependency] !== undefined)) {
                effect.callback(this._state);
            }
        });
    }
    runEffectOnFirstRender() {
        this.effects.forEach((effect) => {
            if (effect.dependencies.length === 0) {
                effect.callback(this._state);
            }
        });
    }
}
Component._effects = [];

class TextField {
    constructor(state, attribute, attributes = {}) {
        this.state = state;
        this.attributes = attributes;
        this.attribute = attribute;
        this.attributes["data-attribute"] = attribute;
    }
    get renderWrapper() {
        return `<input type='text' ${htmlAttributes(this.attributes)} value='${this.state[this.attribute] || ""}'/>`;
    }
    add_action(event, klass, fn, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
        return this;
    }
}

class Text {
    constructor(value) {
        this.value = value;
    }
    get renderWrapper() {
        return this.value;
    }
}

class TextArea {
    constructor(state, attribute, attributes = {}) {
        this.state = state;
        this.attributes = attributes;
        this.attribute = attribute;
        this.attributes["data-attribute"] = attribute;
    }
    get renderWrapper() {
        return `<textarea ${htmlAttributes(this.attributes)}>${this.state[this.attribute] || ""}</textarea>`;
    }
    add_action(event, klass, fn, options = {}) {
        this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
        return this;
    }
}

const Clapton = {
    Box, Component, Text, TextField, Button, DateTimeField, BlockQuote, Checkbox, Code, Element, Emphasis, Form, Heading, Image, Link, List, ListItem, OrderedList, Paragraph, Quote, RadioButton, Select, Span, Embed, Bold, TextArea
};

const bq = (...props) => {
    return new Clapton.BlockQuote(...props);
};
const box = (...props) => {
    return new Clapton.Box(...props);
};
const b = (...props) => {
    return new Clapton.Bold(...props);
};
const button = (...props) => {
    return new Clapton.Button(...props);
};
const check = (...props) => {
    return new Clapton.Checkbox(props[0], props[1], props[2]);
};
const code = (...props) => {
    return new Clapton.Code(...props);
};
const datetime = (...props) => {
    return new Clapton.DateTimeField(props[0], props[1], props[2]);
};
const el = (...props) => {
    return new Clapton.Element(props[0], props[1]);
};
const embed = (...props) => {
    return new Clapton.Embed(props[0]);
};
const em = (...props) => {
    return new Clapton.Emphasis(...props);
};
const form = (...props) => {
    return new Clapton.Form(...props);
};
const h = (...props) => {
    return new Clapton.Heading(props[0], props[1]);
};
const img = (...props) => {
    return new Clapton.Image(props[0], props[1], props[2]);
};
const a = (...props) => {
    return new Clapton.Link(props[0], props[1]);
};
const li = (...props) => {
    return new Clapton.ListItem(...props);
};
const ul = (...props) => {
    return new Clapton.List(...props);
};
const ol = (...props) => {
    return new Clapton.OrderedList(...props);
};
const p = (...props) => {
    return new Clapton.Paragraph(...props);
};
const q = (...props) => {
    return new Clapton.Quote(...props);
};
const radio = (...props) => {
    return new Clapton.RadioButton(props[0], props[1], props[2]);
};
const select = (...props) => {
    return new Clapton.Select(props[0], props[1], props[2]);
};
const span = (...props) => {
    return new Clapton.Span(...props);
};
const textarea = (...props) => {
    return new Clapton.TextArea(props[0], props[1], props[2]);
};
const input = (...props) => {
    return new Clapton.TextField(props[0], props[1], props[2]);
};
const text = (...props) => {
    return new Clapton.Text(props[0]);
};
const c = (name, ...props) => {
    switch (name) {
        case "bq":
            return bq(...props);
        case "box":
            return box(...props);
        case "b":
            return b(...props);
        case "button":
            return button(...props);
        case "check":
            return check(...props);
        case "code":
            return code(...props);
        case "datetime":
            return datetime(...props);
        case "el":
            return el(...props);
        case "embed":
            return embed(...props);
        case "em":
            return em(...props);
        case "form":
            return form(...props);
        case "h":
            return h(...props);
        case "img":
            return img(...props);
        case "a":
            return a(...props);
        case "li":
            return li(...props);
        case "ul":
            return ul(...props);
        case "ol":
            return ol(...props);
        case "p":
            return p(...props);
        case "q":
            return q(...props);
        case "radio":
            return radio(...props);
        case "select":
            return select(...props);
        case "span":
            return span(...props);
        case "textarea":
            return textarea(...props);
        case "input":
            return input(...props);
        case "text":
            return text(...props);
        default:
            return new Clapton.Component(...props);
    }
};

export { c };
