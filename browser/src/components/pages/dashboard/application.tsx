import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Flumpt from "flumpt"
import {DashboardState} from "./states/Dashboard"
import {WidgetState, WidgetType} from "./states/Widget"

class Application extends Flumpt.Flux<DashboardState> {
    subscribe() {
        this.on("create-widget", () => {
            
        });
    }

    render(s: DashboardState) {
        return <h1>Dashboard</h1>
    }
}

export class DashboardPage extends React.Component<{}, {}> {
    componentDidMount() {
        const app = new Application({
            renderer: (el: React.ReactElement<any>) => {
                ReactDOM.render(el, document.querySelector(".content-page"));
            },
            initialState: DashboardState.initialState(),
        });
        app.update(prev => prev);
    }
    render() {
        return <section className="content-page">
        </section>
    }
}
