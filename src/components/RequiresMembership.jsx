import tw from "twin.macro";
import React, {useState} from "react";
import Siwe from "./siwe/Siwe";
import {SectionHeading, Subheading as SubheadingBase} from "./misc/Headings";
import {SectionDescription} from "./misc/Typography";
import Popup from "reactjs-popup";
import ClipLoader from "react-spinners/ClipLoader";
import {PrimaryButton} from "./misc/Buttons";
import {useQuery} from "@tanstack/react-query";
import {useHistory} from "react-router-dom";
import {getMembership} from "../api/whalespotter/account/membership";

const SectionWithBackground = tw.div`grid w-full justify-items-center bg-defaultBackground pt-2`
const HighlightedText = tw.span`text-primary-500`
const Subheading = tw(SubheadingBase)`mb-4`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center mb-4`;

const Left = tw.input`w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none`
const Container = tw.div`mb-8 pt-2 text-gray-600 flex flex-nowrap w-full lg:w-1/3 flex flex-col`

const PopupContainer = tw.div`grid w-full justify-items-center`;
const CloseContainer = tw.div`p-4 w-full`
const Header = tw.h1`text-lg font-black text-purple-600`
const ConnectList = tw.div`flex flex-col w-full mx-2 mb-8`
const ConnectListItem = tw.div`items-center my-2 hover:border-blue-500 border-2 font-bold text-gray-700 hover:text-blue-500 hover:border-2 w-full flex flex-row rounded rounded-lg p-4`
const ConnectItemLogo = tw.img`w-8 h-8 mr-4`
export default function RequiresMembership({target, owner, children}) {

    const [open, setOpen] = useState(false);
    const history = useHistory();

    const membershipQuery = useQuery({
        queryKey: [owner, "membership"],
        queryFn: async () => {
            return await getMembership(owner);
        }
    })

    const closeModal = () => setOpen(false);


    if (membershipQuery.isLoading) {
        return <></>
    }

    if (!membershipQuery.data.member) {
        return (
            <>
                <Popup modal open={open} onClose={closeModal}>
                    <PopupContainer>
                        <CloseContainer>
                            <a className="close" onClick={closeModal}>
                                &times;
                            </a>
                        </CloseContainer>
                        <Header>Connect Wallet</Header>
                        <ConnectList>
                            <ConnectListItem>
                                <ClipLoader
                                    color={'rgb(36, 195, 163)'}
                                    loading={true}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                                <span>&nbsp;Requesting address to be added to the database. This might take a few seconds.</span>
                            </ConnectListItem>
                        </ConnectList>
                    </PopupContainer>
                </Popup>
                <SectionWithBackground>
                    <Subheading>This feature requires a membership</Subheading>
                    <Heading>BECOME A<HighlightedText> MEMBER</HighlightedText></Heading>
                    <Description>Viewing the details of this page will requires a membership. Becoming a member is super
                        easy!</Description>

                    <Container>
                        <PrimaryButton onClick={
                            () => history.push('/membership')
                        }>JOIN US</PrimaryButton>
                    </Container>
                </SectionWithBackground>
            </>
        );
    } else {
        return children;
    }
};