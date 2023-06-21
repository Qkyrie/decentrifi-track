import React from 'react';

import tw from 'twin.macro'

export function Footer() {
    return <div>

        <div id="w-full text-white">
            <div tw="grid grid-cols-12 bg-black  px-4">

                <div tw="mt-5 lg:col-span-2 col-span-12">
                    <h4 tw="font-semibold text-white">About Us</h4>
                    <p tw="text-white font-thin">DefiTrack is a project aggregator and independent research
                        platform investigating all things defi
                        and crypto.</p>
                </div>

                <div tw="mt-5 lg:col-span-3 lg:col-start-6 col-span-6">
                    <h4 tw="text-white font-semibold">DefiTrack</h4>
                    <ul tw="text-white font-thin">
                        <li><a>Terms of Service</a></li>
                        <li><a>Frequently Asked Questions</a></li>
                    </ul>
                </div>

                <div tw="mt-5 lg:col-span-3 col-span-6">
                    <h4 tw="text-white font-semibold">Navigate</h4>
                    <ul tw="text-white font-thin">
                        <li><a>Projects</a></li>
                    </ul>
                </div>
            </div>

            <div tw="w-full bg-black">
                <div tw="w-full border-t-2 border-green-400">
                    <div tw="flex flex-col text-center">
                        <h4 tw="text-2xl font-semibold text-white my-4">Follow us</h4>
                        <ul tw="flex justify-center text-white font-thin">
                            <li tw="mx-4">
                                <a tw="text-4xl " target="_blank" href="https://twitter.com/decentrifi">
                                    {/*<GrTwitter/>*/}
                                </a>
                            </li>
                            <li tw="mx-4">
                                <a tw="text-4xl" target="_blank" href="https://discord.gg/GzABCrSg">
                                    {/*<SiDiscord />*/}
                                </a>
                            </li>
                        </ul>
                        <div tw="text-white font-thin">© Copyright 2021 by Defitrack. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}