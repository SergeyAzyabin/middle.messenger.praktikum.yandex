import Block from "../../utils/Block";
import Input from "../input";
import tpl from "./form-group.hbs";

type Props = {
    
    title: string,
    input: Input,
    error?: string
}

export default class FormGroup extends Block {

    constructor(props: Props) {
        super('div', props);
    }

    render() {
        return this.compile(tpl, this.props)
    }
}