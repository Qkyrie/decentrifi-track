import React from "react";
import swal from "sweetalert";

export default function useContractExceptions() {

    function handle(exception) {
        if (exception.data != null && exception.data.message != null) {
            if (exception.data.message.includes('INSUFFICIENT_OUTPUT_AMOUNT')) {
                swal({
                    text: `You probably don't have enough tokens to perform this transaction.`,
                    icon: "error"
                })
            } else {
                swal({
                    text: `Something went wrong while trying to execute this transaction.`,
                    icon: "error"
                })
            }
        }
    }

    return {
        handle: handle
    }
};