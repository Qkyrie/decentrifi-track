import React from "react";
import tw from 'twin.macro';
import {useHistory} from "react-router-dom";

const Selected = tw.a`inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg`
const Unselected = tw.a`inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-100`

const List = tw.ul`flex flex-wrap text-sm font-medium text-center text-gray-900 border-b border-gray-200 `
const ListItem = tw.li`mr-2`

function SelectionWrapper({selected, children}) {
    return (
        selected ? <Selected>
            {children}
        </Selected> : <Unselected>{children}</Unselected>
    )
}

export default function ({items = []}) {

    const listItems = items.map((item) => {
        return (
            <ListItem onClick={item.onClick}>
                <SelectionWrapper selected={item.selected} href={item.url}
                                  aria-current="page">{item.name}</SelectionWrapper>
            </ListItem>
        )
    });

    return (
        <List>
            {listItems}
        </List>
    )
};