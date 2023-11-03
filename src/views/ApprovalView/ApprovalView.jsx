import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useApprovalHooks} from "./hooks/useApprovalHooks";
import CustomHeader from "../../components/Header/CustomHeader";
import tw from "twin.macro";
import DashboardNavbar from "../../components/DashboardNavbar";
import {ApprovalTable} from "./ApprovalTable";
import {SectionHeading} from "../../components/misc/Headings";
import UnicornDetective from "../../images/unicorns/searching-unicorn.png"
import SecureUnicorn from "../../images/unicorns/secure_unicorn.png"

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const Heading = tw(SectionHeading)`w-full`;

const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const TableContainer = tw.div`w-3/4 my-8`

const SecureUnicornImage = tw.img`w-1/4 rounded`
const SearchingUnicorn = tw.img`w-1/4 rounded`

const GreenUnderline = tw.span`text-green-500 underline`
const Red = tw.span`text-red-500`


export function ApprovalView() {
    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const approvalHooks = useApprovalHooks(address);

    const onAddressChange = (address) => {
        history.push(`/${address}/allowance`);
    };

    return (
        <>
            <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
            <Container>
                <DashboardWrapper>
                    <Center>
                        <DashboardNavbar address={address} selected={"allowance"}/>
                    </Center>
                </DashboardWrapper>
                <SectionWithBackground>
                    {
                        (approvalHooks.importingAllowances || approvalHooks.isFetchingApprovals) &&
                        <>
                            <Heading>Searching for <Red> all approvals</Red> to your
                                assets.</Heading>
                            <SearchingUnicorn src={UnicornDetective}
                                                alt="Unicorn Detective"/>
                        </>
                    }

                    {
                        approvalHooks.allowances.length > 0 &&
                        <>
                            <Heading><Red>Revoke</Red> access to your assets.</Heading>
                            <TableContainer>
                                <ApprovalTable isLoading={approvalHooks.isLoading}
                                               allowances={approvalHooks.allowances}/>
                            </TableContainer>
                        </>
                    }

                    {
                        !approvalHooks.importingAllowances &&
                        !approvalHooks.isFetchingApprovals &&
                        approvalHooks.allowances.length === 0 &&
                        <>
                        <Heading>Great news, very secure!</Heading>
                            <SecureUnicornImage src={SecureUnicorn} />

                            <Heading><GreenUnderline>no unrestricted approvals</GreenUnderline> to your assets were
                                found.</Heading>
                        </>

                    }

                </SectionWithBackground>
            </Container>
        </>
    )
}