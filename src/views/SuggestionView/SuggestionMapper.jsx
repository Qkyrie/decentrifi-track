import IdeaIconImage from "../../images/idea-svgrepo-com.svg";

import BeefyImg from "../../images/protocols/beefy.png";

export class SuggestionMapper {
    map(suggestion) {
        const metadata = suggestion.metadata
        if (suggestion.type === 'POOL_TO_FARM') {
            return {
                imageSrc: IdeaIconImage,
                title: "Easy Farming Opportunity",
                description: <span>You can put your <b>{metadata.poolName}</b> position into <b>{metadata.farmProtocol}</b>'s <b>{metadata.farmName}</b> to start earning additional yield.</span>
            }
        } else if (suggestion.type === 'EXPIRED_FARM') {
            return {
                imageSrc: IdeaIconImage,
                title: "Expired Farm",
                description: <p>You have invested in <b>{metadata.farmProtocol}</b>'s <b>{metadata.farmName}</b>. The farm
                    has expired. Claim rewards by <u>exiting the farm.</u></p>
            }
        } else if (suggestion.type === 'AAVE_V2_MIGRATION') {
            return {
                imageSrc: IdeaIconImage,
                title: "Aave V2 Migration",
                description: <p>You have invested in <b>{metadata.marketName}</b> on <b>Aave V2</b>. For more capital efficiency, migrate to <a href="https://app.aave.com/" target="_blank"><u>Aave V3</u></a></p>
            }
        }
        else if (suggestion.type === 'BEEFY_FARM') {
            return {
                imageSrc: BeefyImg,
                title: "Beefy Farm",
                description: <p>You have invested in <b>{metadata.pool.protocol.name}</b>'s <b>{metadata.pool.name}</b>. You can convert this into a Beefy Vault to make this a <u>capitalizing asset</u></p>
            }
        }
        return null
    }
}