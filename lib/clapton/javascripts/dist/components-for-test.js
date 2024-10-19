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

    class Base {
        constructor(attributes = {}) {
            this.children = [];
            this.attributes = attributes;
        }
        add(child) {
            this.children.push(child);
            return this;
        }
        add_action(eventType, stateName, fnName, options = {}) {
            this.attributes["data-action"] = `${this.attributes["data-action"] || ""} ${eventType}->${stateName}#${fnName}@${options.debounce || 0}`;
            return this;
        }
        get renderWrapper() {
            return "";
        }
    }

    class BlockQuote extends Base {
        get renderWrapper() {
            return `<blockquote ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</blockquote>`;
        }
    }

    class Div extends Base {
        get renderWrapper() {
            return `<div ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</div>`;
        }
    }

    class Bold extends Base {
        get renderWrapper() {
            return `<strong ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</strong>`;
        }
    }

    class Button extends Base {
        get renderWrapper() {
            return `<button ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</button>`;
        }
    }

    class Code extends Base {
        get renderWrapper() {
            return `<code ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</code>`;
        }
    }

    class Element extends Base {
        constructor(type, attributes = {}) {
            super(attributes);
            this.children = [];
            this.type = type;
        }
        get renderWrapper() {
            return `<${this.type} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</${this.type}>`;
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

    class Emphasis extends Base {
        get renderWrapper() {
            return `<em ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</em>`;
        }
    }

    class Form extends Base {
        get renderWrapper() {
            return `<form ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</form>`;
        }
    }

    class Heading extends Base {
        constructor(level, attributes = {}) {
            super(attributes);
            this.level = level;
        }
        get renderWrapper() {
            return `<h${this.level} ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</h${this.level}>`;
        }
    }

    class Image extends Base {
        get renderWrapper() {
            return `<img ${htmlAttributes(this.attributes)}/>`;
        }
    }

    class Link extends Base {
        get renderWrapper() {
            return `<a ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</a>`;
        }
    }

    class ListItem extends Base {
        get renderWrapper() {
            return `<li ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</li>`;
        }
    }

    class List extends Base {
        get renderWrapper() {
            return `<ul ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ul>`;
        }
    }

    class OrderedList extends Base {
        get renderWrapper() {
            return `<ol ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</ol>`;
        }
    }

    class Paragraph extends Base {
        get renderWrapper() {
            return `<p ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</p>`;
        }
    }

    class Quote extends Base {
        get renderWrapper() {
            return `<q ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</q>`;
        }
    }

    class Select extends Base {
        constructor(options = [], state, attribute, attributes = {}) {
            super(attributes);
            this.options = options;
            this.state = state;
            this.attribute = attribute;
        }
        get renderWrapper() {
            return `<select ${htmlAttributes(this.attributes)}>${this.options.map(option => `<option value='${option.value}'${option.value === this.state[this.attribute] ? " selected" : ""}>${option.text}</option>`).join("")}${this.children.map(child => child.renderWrapper).join("")}</select>`;
        }
    }

    class Span extends Base {
        get renderWrapper() {
            return `<span ${htmlAttributes(this.attributes)}>${this.children.map(child => child.renderWrapper).join("")}</span>`;
        }
    }

    class Component {
        constructor(state = {}, id = Math.random().toString(36).substring(2, 10), errors = []) {
            this._state = state;
            this.id = id;
            this._errors = errors;
        }
        get render() {
            return new Div({});
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

    class Input extends Base {
        constructor(state, attribute, attributes = {}) {
            super(attributes);
            this.attribute = attribute;
            this.state = state;
            this.attributes["data-attribute"] = attribute;
        }
        get renderWrapper() {
            let value = this.state[this.attribute];
            if (!this.attributes.type) {
                this.attributes.type = "text";
            }
            if (this.attributes.type === "datetime-local" && value) {
                value = this.datetime_local_value(value);
            }
            return `<input ${htmlAttributes(this.attributes)} value='${value || ""}'/>`;
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

    class Text {
        constructor(value) {
            this.value = value;
        }
        get renderWrapper() {
            return this.value;
        }
    }

    class TextArea extends Base {
        constructor(state, attribute, attributes = {}) {
            super(attributes);
            this.attribute = attribute;
            this.state = state;
            this.attributes["data-attribute"] = attribute;
        }
        get renderWrapper() {
            return `<textarea ${htmlAttributes(this.attributes)}>${this.state[this.attribute] || ""}</textarea>`;
        }
    }

    exports.BlockQuote = BlockQuote;
    exports.Bold = Bold;
    exports.Button = Button;
    exports.Code = Code;
    exports.Component = Component;
    exports.Div = Div;
    exports.Element = Element;
    exports.Embed = Embed;
    exports.Emphasis = Emphasis;
    exports.Form = Form;
    exports.Heading = Heading;
    exports.Image = Image;
    exports.Input = Input;
    exports.Link = Link;
    exports.List = List;
    exports.ListItem = ListItem;
    exports.OrderedList = OrderedList;
    exports.Paragraph = Paragraph;
    exports.Quote = Quote;
    exports.Select = Select;
    exports.Span = Span;
    exports.Text = Text;
    exports.TextArea = TextArea;

    return exports;

})({});
