import {useERC20} from "../../../hooks/erc20/useERC20";
import {useFarms} from "../../../hooks/farms/useFarms";
import {useEffect, useState} from "react";
import {fetchStakingById} from "../../../api/defitrack/staking/staking";
import {fetchTokenBalance} from "../../../api/defitrack/erc20/erc20";
import BigNumber from "bignumber.js";
import swal from "sweetalert";
import {calculatePrice} from "../../../api/defitrack/price/price";
import useWeb3 from "../../../hooks/web3";

export function useFarmingViewHooks(farmingElement) {

    const web3 = useWeb3();
    const erc20 = useERC20(web3.web3React);
    const farmsHook = useFarms(web3.web3React);

    const [staking, setStaking] = useState(null)
    const [wantBalance, setWantBalance] = useState(null)
    const [wantAmountInDollars, setWantAmountInDollars] = useState(0);
    const [approving, setApproving] = useState(false)
    const [depositing, setDepositing] = useState(false)
    const [withdrawing, setWithdrawing] = useState(false)
    const [approved, setApproved] = useState(false);

    async function fetchFarmingPosition() {
        const result = await fetchStakingById(web3.account, farmingElement.protocol, farmingElement.network, farmingElement.id);
        if (result !== null && Object.keys(result).length > 0) {
            setStaking(result)
        }
    }

    async function fetchAllowance() {
        const allowance = await erc20.allowance(web3.account, farmingElement.stakedToken.address, farmingElement.contractAddress)
        setApproved(allowance > 0);
    }

    useEffect(() => {
        if (web3.hasAccount) {
            fetchAllowance();
            fetchFarmingPosition();
        }
    }, [web3.account])


    async function fetchWalletBalance() {
        const balance = await fetchTokenBalance(farmingElement.stakedToken.address, web3.account, farmingElement.network.name)
        setWantBalance(balance)
    }

    useEffect(() => {
        async function fetchData() {
            if (wantBalance !== null && wantBalance > 0) {
                const price = await calculatePrice({
                    address: farmingElement.stakedToken.address,
                    network: farmingElement.network.name,
                    amount: new BigNumber(wantBalance).dividedBy(
                        new BigNumber(10).exponentiatedBy(farmingElement.stakedToken.decimals)
                    ),
                })
                setWantAmountInDollars(price);
            }
        }

        fetchData();
    }, [wantBalance])

    useEffect(() => {
        fetchWalletBalance();
    }, [web3.account])

    const getWantBalance = function () {
        if (wantBalance == null) {
            return "0.00"
        } else {
            const result = new BigNumber(wantBalance).dividedBy(
                new BigNumber(10).exponentiatedBy(farmingElement.stakedToken.decimals)
            )
            if (new BigNumber(0).isLessThan(result)) {
                return `~ ${result.toFixed(6, 0)}`;
            } else {
                return "0.00";
            }
        }
    };

    const getStakedBalance = function () {
        if (staking === null) {
            return "0.00"
        } else {
            const result = new BigNumber(staking.amount)
            if (new BigNumber(0).isLessThan(result)) {
                return `~ ${result.toFixed(6, 0)}`;
            } else {
                return "0.00";
            }
        }
    };

    const validateNetwork = function () {
        if (!web3.isOnCorrectChain(farmingElement.network.chainId)) {
            throw Error(`web3 is not on the correct chain. ${farmingElement.network.slug} chain is required for this transaction.`)
        }
    };

    const depositAll = async () => {
        validateNetwork();
        const n = new BigNumber(wantBalance)

        if (wantBalance < 1) {
            swal({
                text: "You don't have any of the required tokens in your active wallet.",
                icon: "info"
            });
        } else {
            try {
                setDepositing(true);
                const response = await farmsHook.depositAll(farmingElement.vaultType, farmingElement.contractAddress, farmingElement.network);
                response.wait(3).then((receipt) => {
                    swal({
                        text: "Successfully deposited your tokens.",
                        icon: "success"
                    });
                    setDepositing(false);
                    fetchWalletBalance()
                    fetchFarmingPosition()
                }).catch((err) => {
                    swal({
                        text: err.message,
                        icon: "error"
                    })
                    setDepositing(false);
                });
            } catch (ex) {
                swal({
                    text: ex.message,
                    icon: "error"
                })
                setDepositing(false);
            }
        }
    }

    const withdrawAll = async () => {
        try {
            setWithdrawing(true);
            const response = await farmsHook.depositAll(farmingElement.vaultType, farmingElement.contractAddress, farmingElement.network);
            response.wait(3).then((receipt) => {
                swal({
                    text: "You have successfully withdrawn your tokens.",
                    icon: "success"
                });
                setWithdrawing(false);
                fetchWalletBalance()
                fetchFarmingPosition()
            }).catch((err) => {
                swal({
                    text: err.message,
                    icon: "error"
                })
                setWithdrawing(false);
            });
        } catch (ex) {
            swal({
                text: ex.message,
                icon: "error"
            })
            setWithdrawing(false);
        }
    }

    const approve = async () => {
        validateNetwork();
        try {
            setApproving(true);
            const response = await erc20.fullApprove(farmingElement.stakedToken.address, farmingElement.contractAddress);
            response.wait(3).then((receipt) => {
                swal({
                    text: "You have successfully approved your tokens.",
                    icon: "success"
                });
                setApproving(false);
                fetchAllowance()
            }).catch((err) => {
                swal({
                    text: err.message,
                    icon: "error"
                })
                setApproving(false);
            });
        } catch (ex) {
            swal({
                text: ex.message,
                icon: "error"
            })
            setApproving(false);
        }
    }

    return {
        getWantBalance: getWantBalance,
        getStakedBalance: getStakedBalance,
        depositAll: depositAll,
        withdrawAll: withdrawAll,
        approve: approve,
        wantBalance: wantBalance,
        depositing: depositing,
        withdrawing: withdrawing,
        approving: approving,
        staking: staking,
        wantAmountInDollars: wantAmountInDollars,
        approved: approved
    }
}