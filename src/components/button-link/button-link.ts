import Block from "../../utils/block";
import tpl from "./button-link.hbs";

type Props = {
    name: string,
    link?: string,
    events? : {
        click: (e : Event) => void
    }
}

export default class ButtonLink extends Block {

    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(tpl, this.props)
    }
}