import * as Immutable from "immutable"

const enum WidgetType {
    Number,
    Ratio,
}

export interface IApplicationState {
    token: string;
    widgets: Immutable.Map<number, any>;
    watchPool: Immutable.Set<string>;
    valuePool: Immutable.Map<string, number>;
}
