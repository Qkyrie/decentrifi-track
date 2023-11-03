import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {fetchHistoricalData} from "../../../hooks/useCoinGecko";
import tw from "twin.macro";

const ChartBackground = tw.div`w-2/3 bg-gray-900 rounded-lg p-4`
const ChartTitle = tw.div`text-white font-display text-lg p-4`
const TitleContainer = tw.div`w-2/3 text-2xl font-display text-gray-900 mt-4`

export default function ({token}) {

    const dataQuery = useQuery({
        queryKey: ['token', token.address, 'historical-data'],
        queryFn: async () => {
            return await fetchHistoricalData(token.address, token.network.slug);
        },
        enabled: !!token
    });

    if (dataQuery.data == null) {
        return <></>
    }

    const data = dataQuery.data?.prices.map((price) => {
        return {
            date: price[0],
            price: price[1]
        }
    });

    return (
        <>
            <TitleContainer>
                Overview
            </TitleContainer>
            <ChartBackground>
                <ChartTitle>{token.name}</ChartTitle>
                <ResponsiveContainer width={"100%"} height={300}>
                    <LineChart data={data}>
                        <Line dot={false} strokeWidth={3} dataKey="price" stroke="#A020F0"></Line>
                        <XAxis hide={true} dataKey={'date"'}/>
                        <YAxis hide={true} domain={['dataMin', 'dataMax']}/>
                        <Tooltip/>
                    </LineChart>
                </ResponsiveContainer>
            </ChartBackground>
        </>
    )
};