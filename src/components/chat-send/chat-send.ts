import Block from "../../utils/block";

import tpl from "./chat-send.hbs";

type Props = {
    img : string,
    events?: {
        click?: (e: Event) => void,
        
    }
}

export default class ChatSend extends Block {

    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(tpl, this.props)
    }
}