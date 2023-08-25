import {DashboardContext} from "../App";
import useDashboardHooks from "./DashboardView/hooks/dashboard-hooks";

export function DashboardProvider({children}) {

    const dashboardHooks = useDashboardHooks({})

    return <>
        <DashboardContext.Provider value={dashboardHooks}>
            {children}
        </DashboardContext.Provider>
    </>

}