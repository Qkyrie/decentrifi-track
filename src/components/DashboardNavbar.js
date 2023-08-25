import Navbar from "./Navbar/Navbar";
import React, {useContext, useMemo} from "react";
import {useHistory} from "react-router-dom";
import tw from "twin.macro";
import {useQuery} from "@tanstack/react-query";
import {getAccount} from "../api/whalespotter/account/account";
import useDashboardClaimableHooks from "../views/DashboardView/hooks/useDashboardClaimableHooks";
import {DashboardContext} from "../App";

const NewLabel = tw.span`text-xs align-text-top font-thin text-teal-500`

export default function DashboardNavbar({selected = "profile"}) {



    const history = useHistory();

    const {
        claimables,
        address
    } = useContext(DashboardContext)

    const query = useQuery({
        queryKey: ["whalespotter", "users", address],
        queryFn: async () => {
            const response = getAccount(address)
            return await response;
        }
    })

    const stats = useMemo(() => {
        return query.data || {
            "address": address,
            "allowanceCount": 0,
            "transactionCount": 0,
            "suggestionCount": 0
        }
    }, [query.data, address])

    let items = useMemo(() => {
        return [
            {
                name: "Profile",
                selected: selected === "profile",
                onClick() {
                    history.push(`/${address}/profile`)
                }
            },
            claimables.length > 0 && {
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
    }, [stats, claimables, address])

    return (
        <Navbar items={items}/>
    )
};