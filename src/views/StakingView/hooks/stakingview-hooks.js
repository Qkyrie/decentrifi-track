import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {BigNumber} from "@ethersproject/bignumber";
import {fetchTokenBalance, fetchTokenInformation} from "../../../api/defitrack/erc20/erc20";
import {fetchStakingMarketById} from "../../../api/defitrack/staking/staking";
import useWeb3 from "../../../hooks/web3";

export default function useStakingViewHooks() {
    const params = useParams();
    const network = params.network;
    const protocol = params.protocol;
    const stakingId = params.selectedStakingId;

    const web3 = useWeb3();

    const [token, setToken] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [activeFarmingElement, setActiveFarmingElement] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const result = await fetchStakingMarketById(network, protocol, stakingId);
            setActiveFarmingElement(result)
        }

        fetchData();
    }, [])

    useEffect( () => {
        async function fetchData() {
            if (activeFarmingElement !== null) {
                const result = await fetchTokenInformation(activeFarmingElement.stakedToken.address, network);
                setToken(result)
            }
        }

        fetchData();
    }, [activeFarmingElement])

    useEffect(() => {
        async function fetchData() {
            if (token !== null && web3.hasAccount && token.type === 'SINGLE') {
                const result = await fetchTokenBalance(activeFarmingElement.stakedToken.address, web3.account, network);
                if (result > 0) {
                    setUserBalance(
                        BigNumber.from(String(result)).div(
                            BigNumber.from(10).pow(token.decimals)
                        )
                    )
                }
            }
        }

        fetchData();
    }, [token, web3.account]);


    return {
        userBalance: userBalance,
        token: token,
        network: network,
        activeFarmingElement: activeFarmingElement,
        setActiveFarmingElement: setActiveFarmingElement,
    }
}