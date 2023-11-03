import ReactGA from "react-ga4";
import React, {useState} from "react";

import tw from "twin.macro";

const SearchContainer = tw.div`pt-2 w-full relative max-w-screen-xl text-gray-600 grid mb-4`;
const SearchInput = tw.input`w-full border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none`

export default function Search({searchPlaceholder = "Search an address", onAddressChange}) {

    const [searchField, setSearchField] = useState(null);

    const search = function (e) {
        setSearchField(e.target.value);
    }

    return (
            <SearchContainer>
                <SearchInput
                    onKeyDown={e => {
                        if (e.key === 'Enter' && searchField !== null && searchField !== undefined && (searchField.length === 40 || searchField.length === 42)) {
                            ReactGA.event({
                                category: 'dashboard',
                                action: 'Search',
                                label: searchField
                            });
                            onAddressChange(searchField);
                        }
                    }}
                    onChange={search}
                    type="search" name="search" placeholder={searchPlaceholder}/>
            </SearchContainer>
    )
}