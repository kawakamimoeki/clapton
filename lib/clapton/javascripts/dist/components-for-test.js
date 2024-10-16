var Clapton = (function (exports) {
    'use strict';

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
        get render() {
            return `<blockquote ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</blockquote>`;
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
        get render() {
            return `<div ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</div>`;
        }
        add_action(eventType, stateName, fnName, options = {}) {
            this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${eventType}->${stateName}#${fnName}@${options.debounce || 0}`;
            return this;
        }
    }

    class Bold {
        constructor(attributes = {}) {
            this.children = [];
            this.attributes = attributes;
        }
        get render() {
            return `<strong ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</strong>`;
        }
        add(child) {
            this.children.push(child);
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
        get render() {
            return `<button ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</button>`;
        }
        add_action(event, klass, fn, options = {}) {
            this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${event}->${klass}#${fn}@${options.debounce || 0}`;
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
        get render() {
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
        get render() {
            return `<code ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</code>`;
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
        get render() {
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
        get render() {
            return `<${this.type} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</${this.type}>`;
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
        get render() {
            return this.html;
        }
    }

    class Emphasis {
        constructor(attributes = {}) {
            this.children = [];
            this.attributes = attributes;
        }
        get render() {
            return `<em ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</em>`;
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
        get render() {
            return `<form ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</form>`;
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
        get render() {
            return `<h${this.level} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</h${this.level}>`;
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
        get render() {
            return `<img src='${this.src}' alt='${this.alt}' ${htmlAttributes(this.attributes)}/>`;
        }
    }

    class Link {
        constructor(href, attributes = {}) {
            this.children = [];
            this.attributes = attributes;
            this.href = href;
        }
        get render() {
            return `<a href='${this.href}' ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</a>`;
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
        get render() {
            return `<li ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</li>`;
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
        get render() {
            return `<ul ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</ul>`;
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
        get render() {
            return `<ol ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</ol>`;
        }
    }

    class Paragraph {
        constructor(attributes = {}) {
            this.children = [];
            this.attributes = attributes;
        }
        get render() {
            return `<p ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</p>`;
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
        get render() {
            return `<q ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</q>`;
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
        get render() {
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
        get render() {
            return `<select ${htmlAttributes(this.attributes)}>${this.options.map(option => `<option value='${option.value}'${option.value === this.state[this.attribute] ? " selected" : ""}>${option.text}</option>`).join("")}${this.children.map(child => child.render).join("")}</select>`;
        }
    }

    class Span {
        constructor(attributes = {}) {
            this.children = [];
            this.attributes = attributes;
        }
        get render() {
            return `<span ${htmlAttributes(this.attributes)}>${this.children.map(child => child.render).join("")}</span>`;
        }
        add(child) {
            this.children.push(child);
            return this;
        }
    }

    class TextField {
        constructor(state, attribute, attributes = {}) {
            this.state = state;
            this.attributes = attributes;
            this.attribute = attribute;
            this.attributes["data-attribute"] = attribute;
        }
        get render() {
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
        get render() {
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
        get render() {
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

    class Presets {
        bq(...props) {
            return new Clapton.BlockQuote(...props);
        }
        box(...props) {
            return new Clapton.Box(...props);
        }
        b(...props) {
            return new Clapton.Bold(...props);
        }
        button(...props) {
            return new Clapton.Button(...props);
        }
        check(...props) {
            return new Clapton.Checkbox(props[0], props[1], props[2]);
        }
        code(...props) {
            return new Clapton.Code(...props);
        }
        datetime(...props) {
            return new Clapton.DateTimeField(props[0], props[1], props[2]);
        }
        el(...props) {
            return new Clapton.Element(props[0], props[1]);
        }
        embed(...props) {
            return new Clapton.Embed(props[0]);
        }
        em(...props) {
            return new Clapton.Emphasis(...props);
        }
        form(...props) {
            return new Clapton.Form(...props);
        }
        h(...props) {
            return new Clapton.Heading(props[0], props[1]);
        }
        img(...props) {
            return new Clapton.Image(props[0], props[1]);
        }
        a(...props) {
            return new Clapton.Link(props[0], props[1]);
        }
        li(...props) {
            return new Clapton.ListItem(...props);
        }
        ul(...props) {
            return new Clapton.List(...props);
        }
        ol(...props) {
            return new Clapton.OrderedList(...props);
        }
        p(...props) {
            return new Clapton.Paragraph(...props);
        }
        q(...props) {
            return new Clapton.Quote(...props);
        }
        radio(...props) {
            return new Clapton.RadioButton(props[0], props[1], props[2]);
        }
        select(...props) {
            return new Clapton.Select(props[0], props[1], props[2]);
        }
        span(...props) {
            return new Clapton.Span(...props);
        }
        textarea(...props) {
            return new Clapton.TextArea(props[0], props[1], props[2]);
        }
        input(...props) {
            return new Clapton.TextField(props[0], props[1], props[2]);
        }
        text(...props) {
            return new Clapton.Text(props[0]);
        }
    }

    class Component {
        constructor(state = {}, id = Math.random().toString(36).substring(2, 10), errors = []) {
            this._state = state;
            this.id = id;
            this._errors = errors;
            this._root = new Box({ data: { component: this.constructor.name, state: JSON.stringify(this._state), id: this.id, errors: this._errors } });
            this._c = new Presets();
        }
        get render() {
            return this._root.render;
        }
    }

    exports.BlockQuote = BlockQuote;
    exports.Bold = Bold;
    exports.Box = Box;
    exports.Button = Button;
    exports.Checkbox = Checkbox;
    exports.Code = Code;
    exports.Component = Component;
    exports.DateTimeField = DateTimeField;
    exports.Element = Element;
    exports.Embed = Embed;
    exports.Emphasis = Emphasis;
    exports.Form = Form;
    exports.Heading = Heading;
    exports.Image = Image;
    exports.Link = Link;
    exports.List = List;
    exports.ListItem = ListItem;
    exports.OrderedList = OrderedList;
    exports.Paragraph = Paragraph;
    exports.Quote = Quote;
    exports.RadioButton = RadioButton;
    exports.Select = Select;
    exports.Span = Span;
    exports.Text = Text;
    exports.TextArea = TextArea;
    exports.TextField = TextField;

    return exports;

})({});
