import React, {useMemo} from "react";
import {useHistory, useParams} from "react-router-dom";
import CustomHeader from "../../components/Header/CustomHeader";
import tw from "twin.macro";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import DashboardNavbar from "../../components/DashboardNavbar";
import useHistoryHooks from "./hooks/useHistoryHooks";
import TransactionEntry, {TransactionEntryPlaceholder} from "./components/TransactionEntry";
import UnicornDetective from "../../images/unicorns/searching-unicorn.png";
import SecureUnicorn from "../../images/unicorns/secure_unicorn.png";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center mt-4`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;
const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`

const SearchingUnicorn = tw.img`w-1/4 rounded`
const SecureUnicornImage = tw.img`w-1/4 rounded`
const GreenUnderline = tw.span`text-green-500 underline`
const Purple = tw.span`text-purple-500`

const Section = tw.div`grid w-full justify-items-center pt-2`


export default function HistoryView() {

    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const {
        importingHistory,
        isFetchingHistory,
        events
    } = useHistoryHooks(address);

    const onAddressChange = (address) => {
        history.push(`/${address}/history`);
    };


    const entries = useMemo(() => {
        return events?.map((entry) => {
            return (
                <TransactionEntry key={entry.hash} transaction={entry} events={entry.events} owner={address}/>
            )
        })
    }, [events, address]);

    return <>
        <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
        <Container>
            <DashboardWrapper>
                <Center>
                    <DashboardNavbar address={address} selected={"history"}/>
                </Center>
            </DashboardWrapper>
            <SectionWithBackground>
                <Subheading>A little bit of history</Subheading>
                <Heading><HighlightedText>DEFI</HighlightedText> ACTIVITIES</Heading>
                <Description>Here's an overview of your asset transfers, claims, LP activities and borrows
                    events.</Description>
            </SectionWithBackground>
            <DashboardWrapper>

                {
                    (importingHistory || isFetchingHistory) &&
                    <>
                        <Heading>Searching through <Purple> the history</Purple> of your account.</Heading>
                        <SearchingUnicorn src={UnicornDetective}
                                          alt="Unicorn Detective"/>
                    </>
                }
                {
                    entries?.length > 0 &&

                    <Center>
                        {entries}
                    </Center>
                }

                {
                    !importingHistory &&
                    !isFetchingHistory &&
                    events.length === 0 &&
                    <>
                        <Heading>Great news, very secure!</Heading>
                        <SecureUnicornImage src={SecureUnicorn} />

                        <Heading><GreenUnderline>no unrestricted approvals</GreenUnderline> to your assets were
                            found.</Heading>
                    </>

                }
            </DashboardWrapper>
        </Container>

    </>
};




