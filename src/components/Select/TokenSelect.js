import React, {Fragment, useState} from "react";
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import FallbackImage from "../Image/FallbackImage";
import tw from "twin.macro";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TokenSelect({activeToken, tokenList, setActiveToken}) {
    const [selected, setSelected] = useState(activeToken)

    const Balance = tw.p`justify-self-end`

    function onSelectionChanged(e) {
        setSelected(e);
        setActiveToken(e)
    }

    if (selected !== null) {
        return (
            <Listbox value={selected} onChange={onSelectionChanged}>
                {({open}) => (
                    <div tw="mt-1 relative w-full">
                        <Listbox.Button
                            tw="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span tw="flex items-center">
                  <div tw="flex-shrink-0 h-6 w-6 rounded-full">
                      <FallbackImage src={selected.logo} alt=""/>
                  </div>
                <div tw="flex grid grid-cols-2 w-full">
                    <span tw="ml-3 block truncate">{selected.name}</span>
                  <Balance>{selected.viewableBalance}</Balance>
                </div>
              </span>
                            <span
                                tw="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon tw="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                tw="absolute z-10 mt-1 w-full bg-white shadow-lg h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {tokenList.map((token) => (
                                    <Listbox.Option
                                        key={token.address}
                                        tw="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-5"
                                        value={token}>
                                        {({selected, active}) => (
                                            <>
                                                <div tw="flex items-center">
                                                    <div  tw="flex-shrink-0 h-6 w-6 rounded-full">
                                                        <FallbackImage src={token.logo} />
                                                    </div>
                                                    <span tw="font-normal ml-3 block truncate">{token.name}</span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        tw="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                            <CheckIcon tw="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                )}
            </Listbox>
        );
    } else {
        return <></>
    }
}