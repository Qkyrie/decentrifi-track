import React from "react";
import tw from "twin.macro";
import PlaceholderLoading from "react-placeholder-loading";

const Container = tw.div`w-full flex px-4`
const TypeColumn = tw.div`w-1/6 text-center self-center grid justify-items-center`

const AmountColumn = tw.div`w-1/3 flex items-center text-center font-mono`
const SymbolColumn = tw.div`w-1/6 text-right grid justify-items-end`
const Center = tw.div`flex items-center`

const AssetLogo = tw.div`w-5 h-5`
const AssetText = tw.span`text-green-500 font-thin`
const FromOrToColumn = tw.div`w-1/3 text-right font-mono grid justify-items-end self-center`

export default function PlaceholderDetail() {

    return (
        <Container>
            <TypeColumn>
                <PlaceholderLoading width={50} height={10} shape={"rect"} />
             </TypeColumn>
            <AmountColumn>
                <PlaceholderLoading width={50} height={10} shape={"rect"} />

            </AmountColumn>
            <SymbolColumn>
                <Center>
                    <AssetText>
                        <PlaceholderLoading width={50} height={10} shape={"rect"} />
                    </AssetText>
                    &nbsp;
                    <AssetLogo>
                        <PlaceholderLoading width={30} height={30} shape={"circle"} />
                    </AssetLogo>
                </Center>
            </SymbolColumn>
            <FromOrToColumn>
                <PlaceholderLoading width={50} height={10} shape={"rect"} />
            </FromOrToColumn>
        </Container>
    );
}