import { EventBus } from './eventBus';
import { v4 as makeUUID } from 'uuid';


type Props = Record<string, unknown>;

type Meta = {
  tagName: string,
  props: Props
};

export default class Block {

	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element: HTMLElement;

	_meta: Meta;

	_id: string = '';

	eventBus: (() => EventBus);

	props: Props;

	children: Record<string, Block>;


	constructor(tagName: string = 'div', propsAndChildren: Props = {}) {

		const eventBus = new EventBus();

		const { props, children } = this._getChildren(propsAndChildren);

		this.children = children;

		this._meta = {
			tagName,
			props,
		};

		this._id = makeUUID();

		this.props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}


	private _getChildren(propsAndChildren: Props) {
		const children = {} as Record<string, Block>;
		const props = {} as Props;

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
	componentDidMount(oldProps: Props) {

	}

	dispatchComponentDidMount() {

		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

	}

	_componentDidUpdate(oldProps: Props, newProps: Props) {

		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}

	}

	// Может переопределять пользователь, необязательно трогать
	componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {

		return true;

	}

	setProps = (nextProps: Props) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);

		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	};

	get element(): HTMLElement {

		return this._element;
	}

	_render() {

		const block = this.render();
		this._removeEvents();
		this._element.innerHTML = '';
		const element = block.firstElementChild;
		this._element.replaceWith(block);
		this._element = element as HTMLElement;
		this._addEvents();

	}

	_removeEvents() {
		const { events = {} }: Props = this.props;

		if (!events || !this._element) {
			return;
		}

		Object.keys(events).forEach((eventName) => {
			this._element.removeEventListener(eventName, events[eventName]);
		});
	}

	_addEvents() {
		const { events = {} }: Props = this.props;

		Object.keys(events).forEach((eventName) => {
			this._element.addEventListener(eventName, events[eventName]);
		});
	}

	public compile(template: (props: Props) => string, props: Props): DocumentFragment {
		const fragment = document.createElement('template');
		const components: Record<string, Block> = {};
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {

			components[child._id] = child;
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});

		Object.entries(propsAndStubs).forEach(([key, value]) => {

			if (value instanceof Array) {

				const multiValues: string[] = [];
				Object.values(value).forEach((v) => {
					if (v instanceof Block) {
						components[v._id] = v;
						multiValues.push(`<div data-id="${v._id}"></div>`);
					}
				});

				if (multiValues.length) {
					propsAndStubs[key] = multiValues.join('');

				}
			}
		});

		fragment.innerHTML = template(propsAndStubs);

		Object.entries(components).forEach(([id, component]) => {
			const stub = fragment.content.querySelector(`[data-id="${id}"]`);
			if (!stub) {
				return;
			}
			stub.replaceWith(component.getContent());
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

	_makePropsProxy(props: Props) {
		const self = this;

		return new Proxy(props as Props, {
			get(target: Record<string, unknown>, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, prop: string, value: unknown) {
				const oldProps = { ...target };
				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
				return true;
			},

			deleteProperty() {
				throw new Error('Отказано в доступе');
			},
		});
	}

	_createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		const element = document.createElement(tagName);

		element.setAttribute('data-id', this._id);

		return element;
	}

	show() {
		this.getContent().style.display = 'block';
	}

	hide() {
		this.getContent().style.display = 'none';
	}
}