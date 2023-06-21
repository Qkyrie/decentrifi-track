import React, {useEffect} from 'react';
import useLendingPageHooks from "./hooks/lendingpage-hooks";
import NumberFormat from "react-number-format";
import ReactGA from "react-ga4";
import FallbackImage from "../../components/Image/FallbackImage";

function LendingMarketElement({market}) {
    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#" className="block relative">
                            <div className="flex">
                                <FallbackImage src={market.token.logo} className="mx-auto object-cover rounded-full h-10 w-10" />
                                <FallbackImage src={market.protocol.name}  className="mx-auto object-cover rounded-full h-6 w-6 -ml-4" />
                            </div>
                        </a>
                    </div>
                    <div className="ml-3">
                        <div className="flex flex-col">
                            <p className="text-gray-900 whitespace-no-wrap font-medium">
                                {market.token.name}
                            </p>
                            <p className="text-gray-500 whitespace-no-wrap text-sm font-medium">
                                {market.protocol.name}
                            </p>
                        </div>

                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">

                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    <NumberFormat
                        value={market.rate} displayType={'text'} decimalScale={4} thousandSeparator={true}/> %
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Deposit
                </a>
            </td>
        </tr>
    )
}

function LendingMarketList({lendingMarkets, setSearchFilter}) {
    const markets = lendingMarkets().map((market, index) => {
        return (
            <LendingMarketElement key={index} market={market}/>
        )
    })

    return (
        <div className="w-full">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className="text-2xl leading-tight">
                        Markets
                    </h2>
                    <div className="text-end">
                        <form
                            className="flex flex-col lg:flex-row w-3/4 lg:w-full max-w-sm lg:space-x-3 space-y-3 lg:space-y-0 justify-center">
                            <div className=" relative ">
                                <input onChange={(event => {
                                    setSearchFilter(event.target.value)
                                })} type="text" id="searchFilter"
                                       className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                       placeholder="filter by name, provider..."/>
                            </div>
                            <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                type="submit">
                                Filter
                            </button>
                        </form>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    Asset
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    Market Size
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                    APY
                                </th>
                                <th scope="col"
                                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {markets}
                            </tbody>
                        </table>
                        {/*<div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">*/}
                        {/*    <div className="flex items-center">*/}
                        {/*        <button type="button"*/}
                        {/*                className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">*/}
                        {/*            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"*/}
                        {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                        {/*                <path*/}
                        {/*                    d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">*/}
                        {/*                </path>*/}
                        {/*            </svg>*/}
                        {/*        </button>*/}
                        {/*        <button type="button"*/}
                        {/*                className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">*/}
                        {/*            1*/}
                        {/*        </button>*/}
                        {/*        <button type="button"*/}
                        {/*                className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">*/}
                        {/*            2*/}
                        {/*        </button>*/}
                        {/*        <button type="button"*/}
                        {/*                className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">*/}
                        {/*            3*/}
                        {/*        </button>*/}
                        {/*        <button type="button"*/}
                        {/*                className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">*/}
                        {/*            4*/}
                        {/*        </button>*/}
                        {/*        <button type="button"*/}
                        {/*                className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">*/}
                        {/*            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"*/}
                        {/*                 xmlns="http://www.w3.org/2000/svg">*/}
                        {/*                <path*/}
                        {/*                    d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">*/}
                        {/*                </path>*/}
                        {/*            </svg>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

function LendingContent({lendingMarkets, searchFilter, setSearchFilter, selectedNetwork, setSelectedNetwork}) {
    function getNetworkCss(network) {
        if (selectedNetwork === network) {
            return "rounded px-4 flex items-center mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200 bg-green-100"
        } else {
            return "hover:bg-green-100 rounded px-4 flex items-center mb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200"
        }
    }

    return (
        <div className="flex w-full flex-wrap lg:flex-no-wrap">
            <div className="lg:w-2/6 w-full m-4 py-8">
                <div className="shadow-lg px-4 py-6 w-full bg-white relative">
                    <p className="text-sm w-max text-gray-700 font-semibold border-b border-gray-200">
                        Lend Assets
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                        <p className="text-sm text-black font-bold">
                            Lending out assets allows you to generate yield on your principal. <br/><a
                            className="underline" href="https://learn.decentri.fi">Learn how to invest single
                            assets.</a>
                        </p>
                    </div>
                    <div>
                        <div onClick={() => {
                            setSelectedNetwork('ETHEREUM');
                        }}
                             className={getNetworkCss('ETHEREUM')}>
                            <div className="w-2/12">
                                <img alt="ethereum" src="https://github.com/defitrack/data/raw/master/logo/network/ethereum.png"
                                     className="object-cover rounded-full h-10 w-6 "/>
                            </div>
                            <p className="w-10/12">
                                Ethereum
                            </p>
                        </div>
                        <div onClick={() => {
                            setSelectedNetwork('POLYGON');
                        }}
                             className={getNetworkCss('POLYGON')}>
                            <div className="w-2/12">
                                <img alt="polygon" src="https://github.com/defitrack/data/raw/master/logo/network/polygon.png"
                                     className="object-cover rounded-full h-10 w-10 "/>
                            </div>
                            <p className="w-10/12">
                                Polygon
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-4/6 pl-0 lg:p-4 lg:space-y-4">
                <LendingMarketList setSearchFilter={setSearchFilter} lendingMarkets={lendingMarkets}
                                   searchFilter={searchFilter}/>
            </div>
        </div>
    )
}

export default function LendingView() {
    const hooks = useLendingPageHooks();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, [])

    return (
        <>
            <LendingContent lendingMarkets={hooks.lendingMarkets}
                            selectedNetwork={hooks.selectedNetwork}
                            setSelectedNetwork={hooks.setSelectedNetwork}
                            setSearchFilter={hooks.setSearchFilter}/>
        </>
    )
};