import * as Immutable from "immutable"
import {IApplicationState} from "../states/IApplicationState"
import {makePartialUpdate, Update} from "./Reducer"

interface IDataAccessReducerNeed {
    token: string;
    extdata: Immutable.Map<string, number>;
    watchPool: Immutable.Set<string>;
}
interface IEntry {
    count: number;
    name: string;
}

function makeUpdate(update: Update<IApplicationState>): Update<IDataAccessReducerNeed> {
    return makePartialUpdate<IApplicationState, IDataAccessReducerNeed>({
        update: updater => update(updater),
        assemble: (p: IApplicationState, s: IDataAccessReducerNeed) => ({
            token: s.token,
            widgets: p.widgets,
            valuePool: s.extdata,
            watchPool: s.watchPool,
        }),
        disassemble: (p: IApplicationState) => ({
            token: p.token,
            extdata: p.valuePool,
            watchPool: p.watchPool,
        }),
    });
}

export class DataAccessReducer {
    private _update: Update<IDataAccessReducerNeed>;
    private _on: (evt: string, f: Function) => void;
    constructor(on: (evt: string, f: Function) => void, update: Update<IApplicationState>) {
        this._on = on;
        this._update = makeUpdate(update);
    }
    
    subscribe() {
        this._on("login-success", (token: string) => this.onLoginSuccess(token));
        this._on("watch", (target: string) => this.onWatch(target));
        this._on("tick", (token: string) => this.onTick(token));
    }
    
    onWatch(target: string) {
        this._update(prev => ({
            token: prev.token,
            extdata: prev.extdata,
            watchPool: prev.watchPool.add(target),
        }));
    }
    
    onTick(access_token: string) {
        if (access_token == undefined) return;
        fetch('/api/v1/all', {
            method: 'GET',
            headers: { "X-Access-Token": access_token },
        })
        .then(response => response.json())
        .then((result: IEntry[]) => {
            this._update(prev => ({
                token: prev.token,
                extdata: Immutable.Map<string, number>(result.map(e => [e.name, e.count])),
                watchPool: prev.watchPool,
            }));
        });
    }
    
    onLoginSuccess(token: string) {
        this._update(prev => ({
            token: token,
            extdata: prev.extdata,
            watchPool: prev.watchPool,
        }));
    }
}
