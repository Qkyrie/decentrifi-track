import Navbar from "./Navbar/Navbar";
import React, {useMemo} from "react";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import {useAddressStatistics} from "../views/DashboardView/hooks/useAddressStatistics";

const NewLabel = tw.span`text-xs align-text-top font-thin text-teal-500`

export default function DashboardNavbar({selected = "profile", address}) {

    const history = useHistory();

    const {
        stats
    } = useAddressStatistics(address);


    let items = useMemo(() => {
        return [
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
            stats.transactionCount > 0 && {
                name: <span>History</span>,
                selected: selected === "history",
                onClick() {
                    history.push(`/${address}/history`)
                }
            },
            stats.allowanceCount > 0 && {
                name: <span>Allowances</span>,
                selected: selected === "allowance",
                onClick() {
                    history.push(`/${address}/allowance`)
                }
            },
            stats.suggestionCount > 0 &&
            {
                name: <span>Suggestions <NewLabel>new</NewLabel></span>,
                selected: selected === "suggestions",
                onClick() {
                    history.push(`/${address}/suggestions`)
                }
            }
        ].filter((item) => !!item);
    }, [stats, address])

    return (
        <Navbar items={items}/>
    )
};