import * as React from "react"
import * as ReactDOM from "react-dom"
import * as Flumpt from "flumpt"
import * as fetch from "isomorphic-fetch"
import * as Immutable from "immutable"
import {IApplicationState} from "./states/IApplicationState"
import {Updater} from "./reducers/Reducer"
import {DataAccessReducer} from "./reducers/DataAccessReducer"
import {RootComponent} from "./components/Root"
import SHA = require("sha.js")


function authorization(): Promise<string> {
    const hash = (msg: string): string => SHA("sha256").update(msg, 'utf8').digest('hex');
    const username = "sample";
    const password = hash("hoge");
    let access_token = '';
    return fetch(`/auth_token/challenge/${username}`)
    .then(response => response.json())
    .then(value => {
        const challenge = value.challenge;
        const response = hash(`${username}:${password}:${challenge}`);
        return fetch(`/auth_token/generate/${username}`, {
            method: 'POST',
            headers: { "X-Authorization": `${challenge}:${response}` },
        });
    })
    .then(response => response.json())
    .then(result => Promise.resolve<string>(result.access_token as string));
}

class Application extends Flumpt.Flux<IApplicationState> {
    static initialState(): IApplicationState {
        return {
            token: undefined,
            widgets: Immutable.Map<number, any>(),
            valuePool: Immutable.Map<string, number>(),
            watchPool: Immutable.Set<string>(),
        }
    }
    subscribe() {
        const dataAccessUpdater = new DataAccessReducer(
            (evt: string, f: Function) => this.on(evt, f),
            (updater: Updater<IApplicationState>) => this.update(updater)
        );
        dataAccessUpdater.subscribe();
        authorization().then(token => dataAccessUpdater.onLoginSuccess(token));
    }
    render(s: IApplicationState) {
        const props = {
            token: s.token,
            status: s.watchPool.map(key => ({
                name: key,
                count: s.valuePool.get(key),
            })).toArray(),
        };
        return <RootComponent {...props} />;
    }
}

let root = document.querySelector("#root-wrapper");
const app = new Application({
    renderer: (el: React.ReactElement<any>) => ReactDOM.render(el, root),
    initialState: Application.initialState(),
});

// initialize
app.update(prev => prev);
