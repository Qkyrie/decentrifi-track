import React from 'react';
import tw from "twin.macro";
import PlaceholderLoading from "react-placeholder-loading";
import FallbackImage from "../../components/Image/FallbackImage";


const Container = tw.div`w-full my-4`

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white`
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row`
const Row = tw.div`px-4 select-none cursor-pointer flex flex-1 items-center py-2 border-b hover:bg-indigo-100`
const IconColumn = tw.div`flex flex-col w-1/12 justify-center items-center mr-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 `
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `

const NameColumn = tw.div`pl-1 lg:w-1/6 w-3/4 flex-1 font-mono font-medium text-indigo-600 text-xs`
const TokenColumn = tw.div`pl-1 lg:w-1/6 w-3/4 flex-1 font-mono font-medium text-indigo-600 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 lg:w-1/3 w-0`
const TwoColumns = tw.div`grid grid-cols-2`

const ThinGreen = tw.span`text-green-500 font-thin`

const TotalColumn = tw.div`text-sm text-left text-gray-600 w-1/3 lg:w-1/3 justify-items-end grid`
const PullRight = tw.div`flex items-center justify-items-end`
const BoldRed = tw.span`font-bold text-sm text-red-500`
const Hidden = tw.span`hidden lg:block`

const ActionButton = tw.div`ml-4`

const PaginationSection = tw.div`mt-4 flex flex-row justify-center w-full`
const Center = tw.div`flex`

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


export function ApprovalTable({isLoading, allowances, revoke}) {
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

            const doRevoke = async () => {
                await revoke(allowance)
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
                               href={`${allowance.network.baseUrl}/address/${allowance.spender.address}`}>
                                {spender()}
                            </a>
                        </NameColumn>
                        <TokenColumn>
                            {allowance.token.name}
                        </TokenColumn>
                        <AmountColumn>
                            {allowance.amount}
                        </AmountColumn>
                        <TotalColumn>
                            <PullRight>
                                <BoldRed>
                                    <span onClick={doRevoke}>revoke</span>
                                </BoldRed>
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