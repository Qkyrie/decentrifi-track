import React, {useEffect} from 'react';
import WebsiteIcon from "../../images/globe.svg?react";
import ArrowIcon from "../../images/arrow-right-icon.svg?react";
import ProtocolsThreeColGrid from "../../components/cards/ProtocolsThreeColGrid";
import useProtocolsviewHooks from "./hooks/protocolsview-hooks";

export default function ProtocolsView() {

    const protocolsView = useProtocolsviewHooks();

    useEffect(()=> {
        document.title = "Supported Protocols - Explore - Decentrifi"
    }, [])

    const cards = protocolsView.protocols.map(protocol => {
        return {
            slug: protocol.slug,
            imageSrc: protocol.logo,
            name: protocol.name,
            position: protocol.primitives.join(','),
            links: [
                {
                    url: protocol.website,
                    icon: WebsiteIcon
                },
                {
                    url: `/protocols/${protocol.slug}`,
                    icon: ArrowIcon
                }
            ]
        }
    })

    return (
        <>
            <ProtocolsThreeColGrid
                heading="Overview"
                subheading="Supported Protocols"
                description="Here's the current list of the supported protocols. The list updates every day as new features get added."
                cards={cards}
            />
        </>
    )
};