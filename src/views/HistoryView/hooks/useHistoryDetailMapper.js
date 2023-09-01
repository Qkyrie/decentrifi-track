import TransferDetail from "../components/TransferDetail";
import ApprovalDetail from "../components/ApprovalDetail";
import AddLiquidityDetail from "../components/AddLiquidityDetail";
import SwapDetail from "../components/SwapDetail";
import GetRewardDetail from "../components/GetRewardDetail";

export class HistoryDetailMapper {

    map(event, owner, index) {
        if (event.type === "TRANSFER") {
            return <TransferDetail index={index} owner={owner} event={event} />;
        } else if (event.type === "APPROVAL") {
            return <ApprovalDetail index={index} owner={owner} event={event} />;
        } else if (event.type === "ADD_LIQUIDITY") {
            return <AddLiquidityDetail index={index} owner={owner} event={event} />;
        } else if(event.type === "SWAP") {
            return <SwapDetail index={index} owner={owner} event={event} />;
        } else if(event.type === "GET_REWARD") {
            return <GetRewardDetail index={index} owner={owner} event={event} />;
        } else if(event.type === "BURN") {
            return (<></>)
        } else {
            console.log(event.type)
            return null;
        }
    }
}