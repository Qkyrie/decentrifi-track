import TransferDetail from "../components/TransferDetail";
import ApprovalDetail from "../components/ApprovalDetail";
import AddLiquidityDetail from "../components/AddLiquidityDetail";
import SwapDetail from "../components/SwapDetail";
import GetRewardDetail from "../components/GetRewardDetail";

export class HistoryDetailMapper {

    map(event, owner) {
        if (event.type === "TRANSFER") {
            return TransferDetail({event, owner});
        } else if (event.type === "APPROVAL") {
            return ApprovalDetail({event, owner});
        } else if (event.type === "ADD_LIQUIDITY") {
            return AddLiquidityDetail({event, owner});
        } else if(event.type === "SWAP") {
            return SwapDetail({event, owner})
        } else if(event.type === "GET_REWARD") {
            return GetRewardDetail({event, owner})
        } else {
            console.log('unknown type', event.type);
            return null
        }
    }
}