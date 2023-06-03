import Block from "../../utils/Block";
import tpl from "./input.hbs";

type Props = {
    name: string,
    type: string,
    value?: string,
    events?: {
        blur?: (e: Event) => void,
        focus?: (e: Event) => void
    }
}

export default class Input extends Block {

    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(tpl, this.props)
    }
}