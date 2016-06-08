import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Flumpt from "flumpt"
import * as Immutable from "immutable"
import {IWidget} from "./Widget"

export interface IDashboardPageProps {
    widgets: Immutable.Set<IWidget>;
}
export class DashboardPageComponent extends Flumpt.Component<IDashboardPageProps, {}> {
    render() {
        const widgets = this.props.widgets.map(w => {
            return <div key={w.key}>{w.renderWidget()}</div>
        });
        return <div className="dashboard">
            <div className="widgets-page">{widgets}</div>
            <div className="widget-setting">                
            </div>
        </div>
    }    
}
