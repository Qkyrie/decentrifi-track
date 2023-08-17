import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import {ReactComponent as TwitterIcon} from "images/twitter-icon.svg";
import {ReactComponent as GithubIcon} from "images/github-icon.svg";
import Logo from "images/logo/namewithlogo.png";
import {PoweredByAlchemy} from "./components/PoweredByAlchemy";

const Container = styled.div`
  ${tw`relative bg-primary-500 text-gray-100 -mb-8  px-8 py-20 lg:py-24`}
  background-image: url("https://media.istockphoto.com/vectors/abstract-background-of-halftone-dots-and-curved-lines-vector-id1250331164?k=20&m=1250331164&s=612x612&w=0&h=qMsTBJQZ2Kne-2CoZaRvLRSUxpElEG1plEb_YvnxCso=");
  background-repeat: no-repeat;
  background-size: cover;
`

const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const FiveColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-12`;

const Column = tw.div`px-4 sm:px-0 sm:w-1/3 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:border-gray-100 pb-1 transition duration-300`;

const Divider = tw.div`my-16 border-b-2 border-primary-400 w-full`;


const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-64`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-400`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const Center = tw.div`w-1/3 mx-auto text-center grid justify-items-center`;

export default () => {
    return (
        <Container>
            <Content>
                <FiveColumns>
                    <Column>
                        <ColumnHeading>Product</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link href="https://docs.decentri.fi">Documentation</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="https://decentri.fi/dashboard">Insights</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link href="https://docs.decentri.fi/general/supported-protocols">Roadmap</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Developers</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link target="_blank" href="https://github.com/decentri-fi">Github</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link
                                    href="https://gitcoin.co/explorer?network=mainnet&applicants=ALL&keywords=defitrack&order_by=null">Bounties</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link target="_blank" href="https://github.com/decentri-fi/defi-hub">Defi Hub</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link target="_blank" href="https://github.com/decentri-fi/data">Decentrifi Data</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                    <Column>
                        <ColumnHeading>Community</ColumnHeading>
                        <LinkList>
                            <LinkListItem>
                                <Link target="_blank" href="https://twitter.com/decentrifi">Twitter</Link>
                            </LinkListItem>
                            <LinkListItem>
                                <Link
                                    href="https://gitcoin.co/grants/4539/defitrack-find-the-best-opportunities-in-the-defi">Gitcoin
                                    Grants</Link>
                            </LinkListItem>
                        </LinkList>
                    </Column>
                </FiveColumns>
                <Divider/>
                <ThreeColRow>
                    <LogoContainer>
                        <LogoImg src={Logo}/>
                    </LogoContainer>
                    <CopywrightNotice>&copy; 2023 Defitrack. All Rights Reserved.</CopywrightNotice>
                    <SocialLinksContainer>
                        <SocialLink href="https://twitter.com/decentrifi">
                            <TwitterIcon/>
                        </SocialLink>
                        <SocialLink href="https://github.com/decentri-fi">
                            <GithubIcon/>
                        </SocialLink>
                    </SocialLinksContainer>
                </ThreeColRow>
                <Center>
                    <PoweredByAlchemy/>
                </Center>
            </Content>
        </Container>
    );
};
