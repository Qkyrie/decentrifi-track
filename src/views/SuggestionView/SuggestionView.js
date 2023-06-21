import React from "react";
import CustomHeader from "../../components/Header/CustomHeader";
import {useHistory, useParams} from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import RequiresMembership from "../../components/RequiresMembership";
import tw from "twin.macro";
import useSuggestionHooks from "./hooks/useSuggestionHooks.js";
import SuggestionTable from "./SuggestionTable";

const Container = tw.div`flex pt-8 grid`
const DashboardWrapper = tw.div`w-full grid justify-items-center`
const Center = tw.div`w-full flex grid justify-items-center mb-3`
const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const TableContainer = tw.div`w-2/3`

export default function () {

    const history = useHistory();
    const params = useParams();
    const address = params.user;

    const {suggestions, isLoading} = useSuggestionHooks(address);

    const onAddressChange = (address) => {
        history.push(`/${address}/suggestions`);
    };

    return (
        <>
            <CustomHeader showSearch={true} onAddressChange={onAddressChange}></CustomHeader>
            <Container>
                <DashboardWrapper>
                    <Center>
                        <DashboardNavbar address={address} selected={"suggestions"}/>
                    </Center>
                </DashboardWrapper>
                <RequiresMembership target={`/${address}/allowance`}>
                    <SectionWithBackground>
                        <TableContainer>
                            <p>
                                {isLoading && "Loading..."}
                                {
                                    !isLoading && <SuggestionTable suggestions={suggestions}/>
                                }
                            </p>
                        </TableContainer>
                    </SectionWithBackground>
                </RequiresMembership>
            </Container>
        </>
    );
};