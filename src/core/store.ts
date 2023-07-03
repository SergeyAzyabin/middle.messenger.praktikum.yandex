import { EventBus } from "./eventBus";

export type Dispatch<State> = (
    nextStateOrAction : Partial<State> | Action<State>,
    payload? : any
) => void;

export type Action<State> = (
    dispatch : Dispatch<State>,
    state : State,
    payload : any
) => void;
    


export class Store<State extends Record< string, any >> extends EventBus {
    
    private state: State = {} as State;

    constructor (defaultState : State) {
        super();

        this.state = defaultState;
        this.set(defaultState);
    }

    public getState() {
        return this.state;
    }

    public set(nextState : State ) {
        const prevState = { ...this.state }
        
        this.state = { ...this.state, ...nextState};

        this.emit('changed' , prevState, nextState);
    }

    dispatch(nextStateOrAction : State | Action<State>, payload? : any) {
        if(typeof nextStateOrAction === 'function') {
            nextStateOrAction(this.dispatch.bind(this), this.state, payload);
        } else {
            this.set({ ...this.state, ...nextStateOrAction })
        }
    }
}