import React, {useState} from "react";
import PrimaryButton from "../Button/PrimaryButton";
import tw from 'twin.macro';

export function Pagination(rows) {

    const [page, setPage] = useState(0);

    function Previous() {
        if (page === 0) {
            return <></>
        } else {
            return (
                <PrimaryButton label="Previous" onClick={(e) => {
                    if (page !== 0) {
                        setPage(page - 1);
                    }
                }}/>
            );
        }
    }


    function applyPagination(arr, size) {
        return arr.reduce((acc, val, i) => {
            let idx = Math.floor(i / size)
            let page = acc[idx] || (acc[idx] = [])
            page.push(val)

            return acc
        }, [])
    }

    function pageCount() {
        return applyPagination(rows, 10).length;
    }

    function paginationCss(number) {
        if (number === page) {
            return "bg-green-600"
        } else {
            return " "
        }
    }

    const PaginationButtons = () => {
        let btns = []
        const amount = pageCount()
        for (let i = 0; i < amount; i++) {
            if (amount > 4) {
                if (i === 0 || i === (pageCount() - 1) || i === page) {
                    btns.push((
                        <PrimaryButton key={i} label={i} onClick={(e) => {
                            setPage(i)
                        }}>{i + 1}</PrimaryButton>
                    ));
                }
            } else {
                btns.push((
                    <PrimaryButton key={i} label={i} onClick={(e) => {
                        setPage(i)
                    }}/>
                ));
            }
        }
        return btns;
    }


    function Next() {
        if (page === (pageCount() - 1)) {
            return <></>
        } else {
            return (
                <PrimaryButton label="Next" onClick={e => {
                    if (page < pageCount() - 1) {
                        setPage(page + 1);
                    }
                }}/>
            )
        }
    }

    return {
        pagination: (
            <>
                <Previous/>
                <PaginationButtons/>
                <Next/>
            </>
        ),
        elements: applyPagination(rows, 10)[page]
    }
}