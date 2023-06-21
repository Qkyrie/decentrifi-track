import React, {useMemo} from "react";
import {useHistory, useParams} from "react-router-dom";
import CustomHeader from "../../components/Header/CustomHeader";
import tw from "twin.macro";
import {SectionHeading, Subheading as SubheadingBase} from "../../components/misc/Headings";
import {SectionDescription} from "../../components/misc/Typography";
import RequiresMembership from "../../components/RequiresMembership";
import TwoColSingleFeatureWithStats2 from "../../components/features/TwoColSingleFeatureWithStats2";
import DashboardNavbar from "../../components/DashboardNavbar";
import useHistoryHooks from "./hooks/useHistoryHooks";
import TransactionEntry, {TransactionEntryPlaceholder} from "./components/TransactionEntry";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center mt-4`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;
const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`


const Section = tw.div`grid w-full justify-items-center pt-2`


export default function HistoryView() {

    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const {
        loading,
        events
    } = useHistoryHooks(address);

    const onAddressChange = (address) => {
        history.push(`/${address}/history`);
    };


    const entries = useMemo(() => {
       return events?.map((entry) => {
            return (
                <TransactionEntry transaction={entry} events={entry.events} owner={address} />
            )
        })
    }, [events]);

    return <>
        <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
        <Container>
            <DashboardWrapper>
                <Center>
                    <DashboardNavbar address={address} selected={"history"}/>
                </Center>
            </DashboardWrapper>
            <RequiresMembership owner={address}>
                <SectionWithBackground>
                    <Subheading>A little bit of history</Subheading>
                    <Heading><HighlightedText>DEFI</HighlightedText> ACTIVITIES</Heading>
                    <Description>Here's an overview of your asset transfers, claims, LP activities and borrows
                        events.</Description>
                </SectionWithBackground>
                <DashboardWrapper>

                    {
                        loading &&
                        <Center>
                            <TransactionEntryPlaceholder/>
                        </Center>
                    }

                    {
                        !loading && entries?.length > 0 &&

                        <Center>
                            {entries}
                        </Center>
                    }


                    {
                        !loading && entries == null &&
                        <Section>
                            <TwoColSingleFeatureWithStats2
                                statistics={[]}
                                subheading={"History is being scanned"}
                                heading={"We're currently scanning for your history."}
                                description={"Please check back and refresh this page after a while to see your full historical transactions."}
                                primaryButtonText={"Refresh"}
                                primaryButtonUrl={`/${address}/history`}
                                secondaryButtonText={"Back to overview"}
                                secondaryButtonUrl={`/${address}/profile`}
                            />
                        </Section>
                    }
                </DashboardWrapper>
            </RequiresMembership>
        </Container>

    </>
};




