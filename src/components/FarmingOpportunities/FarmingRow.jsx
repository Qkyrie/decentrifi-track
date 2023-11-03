import React from 'react';
import {useHistory} from "react-router-dom";
import FallbackImage from "../Image/FallbackImage";
import DollarLabel from "../Label/DollarLabel";
import APYLabel from "../Label/APYLabel";
import PrimaryButton from "../Button/PrimaryButton";
import tw from "twin.macro";

const SmallhiddenColumn = tw.td`p-2 hidden lg:block`
const ListItem = tw.li`flex flex-row w-full`
const Row = tw.div`select-none w-full cursor-pointer flex flex-1 items-center px-3 py-2 border-b`
const IconColumn = tw.div`flex flex-col lg:w-1/12 w-1/5 justify-center items-center mx-4 lg:block`;
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `


const NameColumn = tw.div`pl-1 w-1/4 flex-1 font-medium text-blue-600 text-xs`

const TwoColumns = tw.div`grid grid-cols-2`

const AmountColumn=tw.div`text-sm text-left text-gray-600 w-1/2 lg:w-1/3`

const TotalColumn = tw.div`text-sm text-left text-gray-600 w-1/3 lg:w-1/5 justify-items-end grid`
const PullRight = tw.div`flex flex-col grid justify-items-end`

const Hidden = tw.span`hidden lg:block`

export default ({farmingElement}) => {
    const history = useHistory()

    let reward;
    if (farmingElement.reward.length > 0) {
        reward = "→ " + farmingElement.reward.map((re) => {
            return re.symbol
        }).reduce((a, b) => {
            return a + ", " + b
        });
    }


    return (
        <ListItem onClick={() => {
            history.push(`/staking/${farmingElement.network.name}/${farmingElement.protocol.slug}/${farmingElement.id}`);
        }}>
            <Row>
                <IconColumn>
                    <FallbackImageContainer>
                        <Image>
                            <FallbackImage src={farmingElement.protocol.logo}/>
                        </Image>
                        <OverlayImage>
                            <FallbackImage src={farmingElement.network.logo}/>
                        </OverlayImage>
                    </FallbackImageContainer>
                </IconColumn>
                <NameColumn>
                    <div>{farmingElement.stakedToken.name} <Hidden>{reward}</Hidden></div>
                </NameColumn>
                <AmountColumn>
                    <TwoColumns>
                        <DollarLabel amount={farmingElement.marketSize}/>
                        <div><APYLabel amount={farmingElement.apr * 100}/>%</div>
                    </TwoColumns>
                </AmountColumn>
                <TotalColumn>
                    <SmallhiddenColumn>
                        <PullRight>
                            <PrimaryButton label="→" onClick={() => {
                                history.push(`/staking/${farmingElement.network.name}/${farmingElement.protocol.slug}/${farmingElement.id}`);
                            }}/>
                        </PullRight>
                    </SmallhiddenColumn>
                </TotalColumn>
            </Row>
        </ListItem>
    )
}