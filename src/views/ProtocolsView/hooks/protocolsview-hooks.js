import {useEffect, useState} from "react";
import {fetchProtocols} from "../../../api/defitrack/protocols/protocols";

export default function useProtocolsviewHooks() {

    const [protocols, setProtocols] = useState([])
    const [selectedProtocol, setSelectedProtocol] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetchProtocols()
            setProtocols(response);
        }

        fetchData();
    }, []);

    return {
        protocols,
        selectedProtocol,
        setSelectedProtocol
    }
}