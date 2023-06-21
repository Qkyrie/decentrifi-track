import IdeaIconImage from "../../images/idea-svgrepo-com.svg";

export class SuggestionMapper {
    map(suggestion) {
        if (suggestion.type === 'POOL_TO_FARM') {
            const metadata = suggestion.metadata
            return {
                imageSrc: IdeaIconImage,
                title: "Pool to Farm",
                description: `You can put your <b>{metadata.poolName}</b> position into <b>{metadata.farmProtocol}</b>'s <b>{metadata.farmName}</b> to start earning additional yield.`
            }
        } else if(suggestion.type === 'EXPIRED_FARM') {
            const metadata = suggestion.metadata
            return {
                imageSrc: IdeaIconImage,
                title: "Expired Farm",
                description: <p>You've invested in <b>{metadata.farmProtocol}</b>'s <b>{metadata.farmName}</b>. The farm has expired. Claim rewards and <u>exit the farm.</u></p>
            }
        } {
            return null
        }
    }
}