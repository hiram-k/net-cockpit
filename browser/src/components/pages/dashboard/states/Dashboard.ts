import * as Immutable from "immutable"
import {WatchPoolState} from "./WatchPool"
import {
    WidgetState,
} from "./Widget"

interface IDashboardStateProps {
    watchPool: WatchPoolState;
    widgets: Immutable.Map<number, WatchPoolState>;
}

export class DashboardState {
    private _watchPool: WatchPoolState;
    private _widgets: Immutable.Map<number, WatchPoolState>;

    constructor(props: IDashboardStateProps) {
        this._watchPool = props.watchPool;
        this._widgets = props.widgets;
    }

    static initialState() {
        return new DashboardState({
            watchPool: WatchPoolState.initialState(),
            widgets: Immutable.Map<number, WatchPoolState>(),
        });
    }

    get widgets() {
        return this._widgets;
    }

}
