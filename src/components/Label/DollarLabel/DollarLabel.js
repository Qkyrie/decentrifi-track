import React from "react";
import NumberFormat from "react-number-format";

export default function DollarLabel({amount, pretty = true}) {

    const calculatePrettyAmount = () => {

        if (!pretty) {
            return {
                amount: amount,
                suffix: ''
            }
        }

        if (amount > 1000_000_000) {
            return {
                amount: amount / 1000_000_000,
                suffix: 'bln.'
            };
        } else if (amount > 1000_000) {
            return {
                amount: amount / 1000_000,
                suffix: 'mln.'
            };
        } else if (amount > 1000) {
            return {
                amount: amount / 1000,
                suffix: 'k'
            };
        } else {
            return {
                amount: amount,
                suffix: ''
            };
        }
    }

    const prettyAmount = calculatePrettyAmount();

    if (amount < 0.01 && amount > 0) {
        return (
            <span>
                <NumberFormat value={0.01} displayType={'text'} fixedDecimalScale={true} decimalScale={2}
                              thousandSeparator={true} prefix={'US$ '}/>
            </span>
        )
    } else {
        return (
            <>
                <NumberFormat value={prettyAmount.amount} displayType={'text'} fixedDecimalScale={true} decimalScale={2}
                              thousandSeparator={true} prefix={'$'}/> {prettyAmount.suffix}
            </>
        );
    }
};