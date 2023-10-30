import React from 'react';
import tw from "twin.macro";
import FallbackImage from "../Image/FallbackImage";
import NumberFormat from "react-number-format";
import APYLabel from "../Label/APYLabel";
import DollarLabel from "../Label/DollarLabel";
import PlaceholderLoading from "react-placeholder-loading";
import {Pagination} from "../Pagination/Pagination";
import styled from "styled-components";

const Container = tw.div`w-full my-4`

const ListContainer = tw.div`flex flex-col w-full mx-auto items-center justify-center bg-white `
const List = tw.ul`flex flex-col w-full`

const ListItem = tw.li`flex flex-row w-full`
const IconBlock = tw.div`block relative`
const FallbackImageContainer = tw.div`flex flex-nowrap`
const Image = tw.div`h-5 w-5 lg:h-8 lg:w-8`
const OverlayImage = tw.div`lg:h-4 lg:w-4 h-2 w-2 -mx-2 `

const Row = tw.div`select-none cursor-pointer flex items-center py-2 border-b hover:bg-indigo-100 w-full`

const IconColumn = tw.div`flex flex-col w-1/12 justify-center items-center mr-4 lg:block`
const NameColumn = tw.div`pl-1 lg:w-5/12 w-4/12 flex-1 font-medium text-indigo-600 text-xs`
const AmountColumn = tw.div`hidden lg:block text-sm text-left text-gray-600 w-2/12 lg:w-1/12`
const TotalColumn = tw.div`text-sm pr-4 text-left text-gray-600 w-3/12 justify-items-end grid`
const ActionColumn = tw.div`w-2/12`


const ThinGreen = tw.span`text-green-500 font-thin`

const PullRight = tw.div`flex grid justify-items-end w-full`
const Bold = tw.span`font-bold text-sm`
const Hidden = tw.span`hidden lg:block`

const ActionButton = tw.div`ml-4 justify-items-end flex w-full`

const PaginationSection = tw.div`mt-4 flex flex-row justify-center w-full`
const Center = tw.div`flex`


function DummyList() {
    return (
        <ListContainer>
            <List>
                <DummyRow key={1}/>
            </List>
        </ListContainer>
    )
}


export default function ({
                             entries = [],
                             header,
                             showPlaceholder = false,
                             usePagination = false
                         }) {
    let filteredEntries = entries;
    let pagination = null;

    if (usePagination) {
        const {
            pagination: paginationSection,
            elements
        } = Pagination(entries);
        filteredEntries = elements;
        pagination = paginationSection;
    }

    const list = () => {
        if (entries.length === 0 && showPlaceholder) {
            return <DummyList/>
        } else {
            return (
                <>
                    <ListContainer>
                        <List>
                            {
                                filteredEntries.map((entry) => {
                                    return (
                                        <ListEntry key={Math.random().toString(36).substring(7)} entry={entry}/>
                                    )
                                })
                            }
                        </List>

                    </ListContainer>
                    <PaginationSection>
                        <Center>
                            {pagination}
                        </Center>
                    </PaginationSection>
                </>

            )
        }
    };

    return (
        <Container>
            {header}
            {list()}
        </Container>
    );
};

function ListEntry({entry}) {

    return (
        <>
            <ListItem onClick={entry.onClick}>
                <Row>
                    <IconColumn>
                        <IconBlock>
                            <FallbackImageContainer>
                                <Image>
                                    <FallbackImage src={entry.logo}/>
                                </Image>
                                <OverlayImage>
                                    <FallbackImage src={entry.networkLogo}/>
                                </OverlayImage>
                            </FallbackImageContainer>
                        </IconBlock>
                    </IconColumn>
                    <NameColumn>
                        {entry.name}
                    </NameColumn>
                    <AmountColumn>
                        <Hidden>
                            <NumberFormat
                                value={entry.amount} displayType={'text'} decimalScale={4}
                                thousandSeparator={true}/>
                            <ThinGreen> {entry.symbol}</ThinGreen>
                            {

                                entry.apr != null && entry.apr > 0 && <div>
                                    <b>

                                        <APYLabel amount={entry.apr * 100}/>
                                        <span>% APR</span>
                                    </b>

                                </div>
                            }
                        </Hidden>
                    </AmountColumn>
                    <TotalColumn>
                        <PullRight>
                            <Bold>
                                <DollarLabel amount={entry.dollarValue}/>
                            </Bold>

                        </PullRight>
                    </TotalColumn>
                    {
                        entry.actionButton &&
                        <ActionColumn>
                            <PullRight>
                                <ActionButton>
                                    {
                                        entry.actionButton &&
                                        entry['actionButton']
                                    }
                                </ActionButton>
                            </PullRight>
                        </ActionColumn>
                    }

                </Row>
            </ListItem>
        </>
    )
}

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
                    <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                    <ThinGreen>
                        <PlaceholderLoading width={50} height={10} shape={"rect"}/>
                    </ThinGreen>
                </AmountColumn>
                <TotalColumn>
                    <PullRight>
                        <Bold>
                        </Bold>
                    </PullRight>
                </TotalColumn>
            </Row>
        </ListItem>
    );
}