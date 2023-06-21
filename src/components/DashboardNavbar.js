import Navbar from "./Navbar/Navbar";
import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import {DashboardContext} from "../App";
const NewLabel = tw.span`text-xs align-text-top font-thin text-teal-500`

export default function DashboardNavbar({address , selected = "profile"}) {

    const history = useHistory();

    let items = [
        {
            name: "Profile",
            selected: selected === "profile",
            onClick() {
                history.push(`/${address}/profile`)
            }
        },
        {
            name: "Claimables",
            selected: selected === "claimables",
            onClick() {
                history.push(`/${address}/claimables`)
            }
        },
        {
            name: <span>History</span>,
            selected: selected === "history",
            onClick() {
                history.push(`/${address}/history`)
            }
        },
        {
            name: <span>Allowances</span>,
            selected: selected === "allowance",
            onClick() {
                history.push(`/${address}/allowance`)
            }
        },
        {
            name: <span>Suggestions <NewLabel>new</NewLabel></span>,
            selected: selected === "suggestions",
            onClick() {
                history.push(`/${address}/suggestions`)
            }
        }
    ];
    return (
        <Navbar items={items}/>
    )
};