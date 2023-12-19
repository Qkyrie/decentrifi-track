import {useEffect, useMemo, useState} from "react";
import {getEvents, getHistoryJob} from "../../../api/whalespotter/transactions/transactions";
import {useQuery} from "@tanstack/react-query";
import {getApprovalJob, getApprovals} from "../../../api/whalespotter/approvals/Approvals";

export default function (address, page) {

    const [rescan, setRescan] = useState(true);

    const historyJobQuery = useQuery({
        queryKey: ['account', address, 'history', 'job'],
        queryFn: async () => {
            console.log(`fetching history job for user ${address} and page ${page}`)
            const job = await getHistoryJob(address, page)
            if (job?.status === 'FINISHED') {
                setRescan(false);
            }
            return job;
        },
        refetchInterval: rescan ? 1000 : 0
    })

    const importingHistory = useMemo(() => {
        if (historyJobQuery.isLoading
            || historyJobQuery.data?.status === "CREATED"
            || historyJobQuery.data === undefined
            || historyJobQuery.data?.status === undefined) {
            return true;
        } else {
            return false;
        }
    }, [historyJobQuery.isLoading, historyJobQuery.data, page])


    const eventsQuery = useQuery({
        queryKey: ['account', address, 'events', page || 1],
        queryFn: async () => {
            return await getEvents(address, page)
        },
        enabled: !!address && !importingHistory
    })

    useEffect(() => {
        document.title = `History for ${address} - Decentrifi`;
    }, [address]);

    return {
        importingHistory,
        isFetchingHistory: eventsQuery.isLoading,
        events: eventsQuery.data || {content: []},
    }
};