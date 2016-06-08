import * as Immutable from "immutable"
import {IWatchRequest} from "./IWatchRequest"

export class WatchPoolState {
    
    private _identifiers: Immutable.Set<number>;
    private _requestPool: Immutable.Map<number, IWatchRequest>;
    private _responsePool: Immutable.Map<number, number>;
    
    constructor(props: {
        identifiers: Immutable.Set<number>,
        requestPool: Immutable.Map<number, IWatchRequest>,
        responsePool: Immutable.Map<number, number>,
    }) {
        this._identifiers = props.identifiers;
        this._requestPool = props.requestPool;
        this._responsePool = props.responsePool;
    }
    
    get requestPool(): Immutable.Map<number, IWatchRequest> {
        return this._requestPool;
    }
    
    get responsePool(): Immutable.Map<number, number> {
        return this._responsePool;
    }
    
    static initialState(): WatchPoolState {
        return new WatchPoolState({
            identifiers: Immutable.Set<number>(),
            requestPool: Immutable.Map<number, IWatchRequest>(),
            responsePool: Immutable.Map<number, number>(),
        });
    }
    
    watch(req: IWatchRequest): [number, WatchPoolState] {
        const id = this._identifiers.max() || 0;
        const state = new WatchPoolState({
            identifiers: this._identifiers.add(id),
            requestPool: this._requestPool.set(id, req),
            responsePool: this.responsePool.set(id, 0),
        });
        return [id, state];
    }
    
    unwatch(id: number): WatchPoolState {
        return new WatchPoolState({
            identifiers: this._identifiers.remove(id),
            requestPool: this._requestPool.remove(id),
            responsePool: this.responsePool.remove(id),
        });
    }
    
    updateValue(id: number, val: number): WatchPoolState {
        return new WatchPoolState({
            identifiers: this._identifiers,
            requestPool: this._requestPool,
            responsePool: this._responsePool.set(id, val),
        });
    }
    
    updateValues(entries: [number, number][]): WatchPoolState {
        return entries.reduce<WatchPoolState>((acc, entry) => {
            const [id, val] = entry;
            return acc.updateValue(id, val);
        }, this);
    }
    
    getValueOf(id: number) {
        return this._responsePool.get(id);
    }

}
