import TransferDetail from "../components/TransferDetail";
import ApprovalDetail from "../components/ApprovalDetail";
import AddLiquidityDetail from "../components/AddLiquidityDetail";

export class HistoryDetailMapper {

    map(event, owner) {
        if (event.type === "TRANSFER") {
            return TransferDetail({event, owner});
        } else if (event.type === "APPROVAL") {
            return ApprovalDetail({event, owner});
        } else if (event.type === "ADD_LIQUIDITY") {
            return AddLiquidityDetail({event, owner});
        } else {
            console.log(event.type);
            return null
        }
    }
}