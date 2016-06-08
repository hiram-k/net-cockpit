import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Flumpt from "flumpt"

interface ISystemState {
    count: number;
}
interface ISystemPageRootProps {
    hoge: string;
}

class SystemPageRootComponent extends Flumpt.Component<ISystemPageRootProps, {}> {
    componentDidMount() {
        this.dispatch("load");
    }
    render() {
        return <div>
            <h1>{this.props.hoge}</h1>
            <button onClick={() => this.dispatch("incr")}>+</button>
        </div>
    }
}

class SystemApplication extends Flumpt.Flux<ISystemState> {
    subscribe() {
        this.on("load", () => {
            console.log("on load");
        })
        this.on("incr", () => {
            console.log("incr");
            this.update(prev => ({
                count: prev.count + 1,
            }));
        });
    }
    static initialState(): ISystemState {
        return {
            count: 1,
        }
    }
    render(s: ISystemState) {
        const props = {
            hoge: `${s.count}`
        };
        return <SystemPageRootComponent {...props} />;
    }
}

export class SystemPage extends React.Component<{}, {}> {
    componentDidMount() {
        const app = new SystemApplication({
            renderer: (el: React.ReactElement<any>) => {
                ReactDOM.render(el, document.querySelector(".content-page"));
            },
            initialState: SystemApplication.initialState(),
        });
        app.update(prev => prev);
    }
    render() {
        return <section className="content-page">
        </section>
    }
}
