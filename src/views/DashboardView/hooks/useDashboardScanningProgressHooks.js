import {useState} from "react";

export default function useDashboardScanningProgressHooks() {
    const [totalScanning, setTotalScanning] = useState(0);
    const [doneScanning, setDoneScanning] = useState(0);

    return {
        totalScanning,
        setTotalScanning,
        doneScanning,
        setDoneScanning
    }
};