import IdeaIconImage from "../../images/idea-svgrepo-com.svg";

export class SuggestionMapper {
    map(suggestion) {
        const metadata = suggestion.metadata
        if (suggestion.type === 'POOL_TO_FARM') {
            return {
                imageSrc: IdeaIconImage,
                title: "Pool to Farm",
                description: <span>You can put your <b>{metadata.poolName}</b> position into <b>{metadata.farmProtocol}</b>'s <b>{metadata.farmName}</b> to start earning additional yield.</span>
            }
        } else if (suggestion.type === 'EXPIRED_FARM') {
            return {
                imageSrc: IdeaIconImage,
                title: "Expired Farm",
                description: <p>You have invested in <b>{metadata.farmProtocol}</b>'s <b>{metadata.farmName}</b>. The farm
                    has expired. Claim rewards by <u>exiting the farm.</u></p>
            }
        }

        return null
    }
}