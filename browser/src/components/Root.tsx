import * as React from "react"
import * as Flumpt from "flumpt"

interface IRootProps {
    token: string;
    status: {count: number, name: string}[];
}
interface IRootState {
    target: string;
}

export class RootComponent extends Flumpt.Component<IRootProps, IRootState> {
    constructor(props: IRootProps) {
        super(props);
        this.state = {target: ''};
    }
    componentDidMount() {
        window.setInterval(() => this.dispatch("tick", this.props.token), 1000);
    }
    render() {
        return <div>
            <input type="text" value={this.state.target} onChange={ev => {
                const target = (ev.target as any).value as string;
                this.setState({target});
            }}/> 
            <input type="submit"
                onClick={() => { 
                    const name = this.state.target;
                    this.dispatch("watch", name);
                }}
            />
            {this.props.status.map(s => (
                <div key={s.name}>{s.name} : {s.count}</div>
            ))}
        </div>
    }
}
