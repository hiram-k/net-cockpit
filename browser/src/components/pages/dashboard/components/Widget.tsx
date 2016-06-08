import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Flumpt from "flumpt"

export interface IWidget {
    key: number;
    renderWidget(): React.ReactElement<any>;
    renderSetting(): React.ReactElement<any>;
}

abstract class WidgetComponent<T> extends Flumpt.Component<T, {}> implements IWidget {
    constructor(private _key: number) {
        super();
    }
    
    get key(): number {
        return this._key;
    }
    renderWidget(): React.ReactElement<any> {
        throw "override me";
    }
    renderSetting(): React.ReactElement<any> {
        throw "override me";
    }
}

interface IStatusWidgetProps {
    key: number;
    isPositive: boolean;
    backgroundColor: string;
    targetName: string;
}
export class StatusWidgetComponent extends WidgetComponent<IStatusWidgetProps> {
    get key(): number {
        return this.props.key;
    }
    renderWidget(): React.ReactElement<any> {
        return <div>
        すてーたすです
        </div>
    }
    
    renderSetting(): React.ReactElement<any> {
        return <div>
        すてーたすのせっていです
        </div>
    }
}

interface LineGraphWidgetProps {
}
export class LineGraphWidgetComponent extends Flumpt.Component<{}, {}> {
    renderWidget(): React.ReactElement<any> {
        return <div>
        せんぐらふです
        </div>
    }
    
    renderSetting(): React.ReactElement<any> {
        return <div>
        せんぐらふのせっていです
        </div>
    }
}
