import React from 'react';
import FallbackImage from "../Image/FallbackImage";
import DollarLabel from "../Label/DollarLabel";
import APYLabel from "../Label/APYLabel";
import PrimaryButton from "../Button/PrimaryButton";
import tw from "twin.macro";

const ListItem = tw.li`flex flex-row`
const Row = tw.div`select-none cursor-pointer flex flex-1 items-center px-3 py-2 border-b`
const IconColumn = tw.div`flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block`;
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`

const NameColumn = tw.div`pl-1 w-1/4 flex-1 font-medium text-blue-600 text-xs`

const TwoColumns = tw.div`grid grid-cols-2`

const AmountColumn = tw.div`text-sm text-left text-gray-600 w-1/2 lg:w-1/3`

const TotalColumn = tw.div`text-sm text-left text-gray-600 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`


export default ({lendingElement}) => {
        return (
            <ListItem>
                <Row>
                    <IconColumn>
                        <FallbackImageContainer>
                            <Image>
                                <FallbackImage src={lendingElement.protocol.logo}/>
                            </Image>
                        </FallbackImageContainer>
                    </IconColumn>
                    <NameColumn>
                        <div tw="text-gray-800">{lendingElement.name}</div>
                    </NameColumn>
                    <AmountColumn>
                        <TwoColumns>
                            <div tw="text-center"><DollarLabel amount={lendingElement.marketSize}/></div>
                            <div tw="text-center text-green-500"><APYLabel amount={lendingElement.rate * 100}/>%</div>
                        </TwoColumns>
                    </AmountColumn>
                    <TotalColumn>
                        <PullRight>
                            <PrimaryButton label="+" onClick={() => {
                                console.log('start investing')
                            }}/>
                        </PullRight>
                    </TotalColumn>
                </Row>

            </ListItem>
        )
}