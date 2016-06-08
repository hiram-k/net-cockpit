import * as React from "react"
import * as Flumpt from "flumpt"
import {Link, Router} from "react-router"

export class SideMenu extends Flumpt.Component<{}, {}> {
    render() {
        return <nav className="side-menu">
            <ul className="menu-group">
                <li className="menu-item">
                    <Link activeClassName="active" className="block-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="menu-item">
                    <Link activeClassName="active" className="block-link" to="/system">System</Link>
                </li>
            </ul>
        </nav>
    }
}
