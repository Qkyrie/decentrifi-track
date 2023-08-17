import React from "react";
import tw from "twin.macro";
const AlchemyLink = tw.a`w-1/3`
const AlchemyBadge = tw.img`w-full`

export function PoweredByAlchemy() {

    function onClick() {
        window.open("https://alchemy.com/?r=28b98946-57c8-41d4-8ba3-ca85c3bf429a", "_blank");
    }

    return (
        <>
            <script>const BADGE_ID = '28b98946-57c8-41d4-8ba3-ca85c3bf429a';</script>
            <script type="text/javascript" src="http://static.alchemyapi.io/scripts/badge/alchemy-badge.js"></script>
            <AlchemyLink href="#">
                <AlchemyBadge onClick={onClick} id="badge-button"
                              src="https://static.alchemyapi.io/images/marketing/badgeLight.png" alt="Alchemy Supercharged"/>
            </AlchemyLink>
        </>
    )
}