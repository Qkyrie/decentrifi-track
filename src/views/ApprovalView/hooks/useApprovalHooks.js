import {useQuery} from "@tanstack/react-query";
import {getApprovalJob, getApprovals} from "../../../api/whalespotter/approvals/Approvals";
import {useMemo, useState} from "react";

export function useApprovalHooks(address) {

    const [rescan, setRescan] = useState(true);

    const approvalJobQuery = useQuery({
        queryKey: ['account', address, 'allowance', 'job'],
        queryFn: async () => {
            console.log('fetching approval job')
            const job = await getApprovalJob(address)
            if (job?.status === 'FINISHED') {
                setRescan(false);
            }
            return job;
        },
        refetchInterval: rescan ? 1000 : 0
    })

    const importingAllowances = useMemo(() => {
        console.log('job loading?', approvalJobQuery.isLoading)
        console.log('created?', approvalJobQuery.data?.status)
        console.log('undefined?', approvalJobQuery.data === undefined)
        if (approvalJobQuery.isLoading
            || approvalJobQuery.data?.status === "CREATED"
            || approvalJobQuery.data === undefined
            || approvalJobQuery.data?.status === undefined) {
            return true;
        } else {
            return false;
        }
    }, [approvalJobQuery.isLoading, approvalJobQuery.data])

    const approvalQuery = useQuery({
        queryKey: ['account', address, 'allowance'],
        queryFn: async () => {
            return await getApprovals(address)
        },
        enabled: !!address && !importingAllowances
    })

    return {
        importingAllowances,
        allowances: approvalQuery.data || [],
        isFetchingApprovals: approvalQuery.isLoading,
    }
}