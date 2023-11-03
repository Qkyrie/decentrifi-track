import React from 'react';
import tw from "twin.macro";
import PlaceholderLoading from "react-placeholder-loading";
import FallbackImage from "../../components/Image/FallbackImage";
import BigNumber from "bignumber.js";
import {toast, ToastContainer} from "react-toastify";
import {useTransactions} from "../../hooks/useTransactions";
import {useApprovals} from "./hooks/useApprovals";
import useWeb3 from "../../hooks/web3";
import useConnectWalletPopup from "../../components/ConnectWalletPopup/UseConnectWalletPopup";
import ConnectWalletPopup from "../../components/ConnectWalletPopup/UseConnectWalletPopup";


const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row`
const Row = tw.div`px-4 select-none cursor-pointer flex flex-1 items-center py-2 border-b hover:bg-indigo-100`

const IconColumn = tw.div`flex flex-col w-1/12 justify-center items-center mr-4 lg:block`;
const NameColumn = tw.div`pl-1 lg:w-2/6 w-3/4  font-mono font-medium text-indigo-600 text-xs`
const TokenColumn = tw.div`pl-1 lg:w-1/3 w-3/4 font-mono font-medium text-indigo-600 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 lg:w-1/3 w-0`


const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 `

const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 text-sm font-thin`
const ThinBlue = tw(ThinGreen)`text-blue-500`

const TotalColumn = tw.div`text-sm text-left text-gray-600 w-1/3 lg:w-1/3 justify-items-end grid`
const PullRight = tw.div`flex items-center justify-items-end`
const BoldRed = tw.span`font-bold text-sm text-red-500`

function DummyRow() {
    return (
        <ListItem>
            <Row>
                <IconColumn>
                    <IconBlock>
                        <FallbackImageContainer>
                            <Image>
                                <PlaceholderLoading width={30} height={30} shape={"circle"}/>
                            </Image>
                        </FallbackImageContainer>
                    </IconBlock>
                </IconColumn>
                <NameColumn>
                    <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <div>
                            <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                        </div>
                        <ThinGreen>
                            <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                        </ThinGreen>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <BoldRed>
                        </BoldRed>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    );
}


function DummyList() {
    return (
        <ListContainer>
            <List>
                <DummyRow key={1}/>
            </List>
        </ListContainer>
    )
}


export function ApprovalTable({isLoading, allowances}) {

    const web3 = useWeb3();
    let {isOnCorrectChain} = useTransactions();

    if (isLoading) {
        return <DummyList/>
    } else {


        const listItems = allowances.map((allowance) => {
            const spender = () => {
                if (allowance.spender.label) {
                    return allowance.spender.label;
                } else {
                    return sliceAccount(allowance.spender.address);
                }
            }


            let correctChain = isOnCorrectChain(allowance.network.chainId);

            function getActionButton(allowance) {
                console.log('web3: ', web3.active)
                if (!web3.active) {
                    return <ConnectButton />
                } else if(!correctChain) {
                    return <ChangeNetworkButton allowance={allowance}/>
                } else {
                    return <RevokeButton allowance={allowance}/>
                }
            }

            return (
                <ListItem>
                    <Row>
                        <IconColumn>
                            <IconBlock>
                                <FallbackImageContainer>
                                    <Image>
                                        <FallbackImage src={allowance.network.logo}/>
                                    </Image>
                                </FallbackImageContainer>
                            </IconBlock>
                        </IconColumn>
                        <NameColumn>
                            <a target="_blank"
                               rel="noreferrer"
                               href={`${allowance.network.baseUrl}/address/${allowance.spender.address}`}>
                                {spender()}
                            </a>
                        </NameColumn>
                        <TokenColumn>
                            {allowance.token.name}
                        </TokenColumn>
                        <AmountColumn>
                            {normalized('+', allowance.amount, allowance.token.decimals)}
                        </AmountColumn>
                        <TotalColumn>
                            <PullRight>
                                    <ToastContainer closeOnClick={false} theme={'light'}/>
                                {getActionButton(allowance)}
                            </PullRight>
                        </TotalColumn>
                    </Row>
                </ListItem>
            )
        });

        return (
            <>
                <ListContainer>
                    <List>
                        <ListItem>
                            <Row>
                                <NameColumn>
                                    Spender
                                </NameColumn>
                                <AmountColumn>
                                    Amount
                                </AmountColumn>
                                <TotalColumn>
                                    <PullRight>
                                        <BoldRed>
                                        </BoldRed>
                                    </PullRight>
                                </TotalColumn>
                            </Row>
                        </ListItem>
                        {listItems}
                    </List>
                </ListContainer>
            </>
        )
    }
}

const sliceAccount = function (address) {
    return `${address.slice(0, 6)}...${address.slice(-6, address.length)}`;
};

const normalized = function (sign, amount, decimals = 18) {
    if (amount == null) {
        return "0.00"
    } else {
        const result = new BigNumber(amount).dividedBy(
            new BigNumber(10).exponentiatedBy(decimals)
        )
        if (new BigNumber(100000000000000000000000000000000000).isLessThan(result)) {
            return 'everything'
        }
        if (new BigNumber(0).isLessThan(result)) {
            return `~ ${sign}${result.toFixed(6, 0)}`;
        } else {
            return <>&nbsp;&nbsp;&nbsp;0.00</>;
        }
    }
};

function RevokeButton({allowance}) {

    const {handleErrorResult} = useTransactions();
    const {revoke} = useApprovals();

    const doRevoke = async (event) => {
        event.stopPropagation();
        try {
            toast("Signing transaction to claim tokens.")
            const result = await revoke(allowance);
            toast.dismiss();
            if (result !== undefined) {
                await toast.promise(
                    result.wait(),
                    {
                        pending: "Transaction submitted, awaiting confirmation.",
                        success: "Your approvals are succesfully revoked.",
                    }
                )
            }
        } catch (err) {
            toast.dismiss();
            handleErrorResult(err).then(() => {
            })
        }
    }


    return <BoldRed onClick={doRevoke}>revoke</BoldRed>;
}

function ChangeNetworkButton({allowance}) {
    const {validateChainId} = useTransactions();

    async function changeNetwork() {
        console.log('changing network');
        await validateChainId(allowance.network.chainId)
    }

    return <>
        <ThinGreen onClick={changeNetwork}>change network</ThinGreen>
    </>
}


function ConnectButton() {
    const {
        html: connectWalletPopup,
        open: openConnectWalletPopup,
    } = ConnectWalletPopup();

    async function connect() {
        openConnectWalletPopup();
    }

    return <>
        {connectWalletPopup}
        <ThinBlue onClick={connect}>connect</ThinBlue>
    </>
}
