import { EventBus } from './EventBus';
import { v4 as makeUUID } from 'uuid';



type Meta = {
    tagName: string,
    props: Record<string, any>
}

export default class Block {

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element: HTMLElement;
    _meta: Meta;
    _id: string = '';
    eventBus: (() => EventBus);
    props: any;
    children: Record<string, Block>;


    constructor(tagName: string = "div", propsAndChildren : any = {}) {

        const eventBus = new EventBus();

        const { props, children } = this._getChildren(propsAndChildren);

        this.children = children;
        
        this._meta = {
            tagName,
            props
        };

        this._id = makeUUID();

        this.props = this._makePropsProxy({ ...props, __id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }


    private _getChildren(propsAndChildren: Record<string, any>) {
        const children = {} as Record<string, Block>;
        const props = {} as Record<string, any>;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }


    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {

        const { tagName } = this._meta;

        this._element = this._createDocumentElement(tagName);

        
    }

    protected init() {

        

        this._createResources();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);

        
    }

    _componentDidMount() {
        this.componentDidMount(this._meta.props);
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);


    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps: Record<string, any>) {

    }

    dispatchComponentDidMount() {

        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    }

    _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {

        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {

        return true;

    }

    setProps = (nextProps: Record<string, any>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);

        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    };

    get element() : HTMLElement  {
        
        return this._element;
    }

    _render() {
        const fragment = this.render();

        
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду

        const newElement = fragment.firstElementChild as HTMLElement;


        this._removeEvents();

        // this._element.innerHTML = '';

        this._element.replaceWith(newElement);

        this._element = newElement;

        this._addEvents();

    }

    _removeEvents() {
        const { events = {} }: any = this.props;

        if (!events || !this._element) {
            return;
        }

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName, events[eventName]);
        });
    }

    _addEvents() {
        const { events = {} }: any = this.props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }


    public compile(template: (props: any) => string, props: any): DocumentFragment {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndStubs)


        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    // Может переопределять пользователь, необязательно трогать
    render() {
        return new DocumentFragment();
    }

    getContent() {
        
        return this.element;
    }

    _makePropsProxy(props: any) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                
                if (target[prop] !== value) {
                    target[prop] = value;
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU);
                    return true;
                }
                return false;
            },
            deleteProperty(_target, _prop) {
                throw new Error('нет доступа');
            },
        });
    }

    _createDocumentElement(tagName : string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        const element = document.createElement(tagName);

        element.setAttribute('data-id', this._id);

        return element;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}