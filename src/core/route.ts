import Block from "./block";

import { RenderDOM, isEqual } from "../utils/helpers";

type BlockType = typeof Block;

type Props = Record<string, unknown>;

export default class Route {
    _pathname: string;
    _block: Block | null;
    _blockClass: BlockType;
    _props : Props;


    constructor(pathname : string, view : BlockType, props : Props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname : string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render(this._props.rootQuery as string);
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname : string) {
        return isEqual(pathname, this._pathname);
    }

    render(query : string) {
        if (!this._block) {
            this._block = new this._blockClass();
        }
        RenderDOM(query, this._block);
        this._block.show();
    }
}