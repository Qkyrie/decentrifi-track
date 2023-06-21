import React from 'react';
import tw from "twin.macro";
import {ToggleButton} from "@mui/material";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline"; //eslint-disable-line

export default function Toggle({onChange, checked, checkedLabel = <EyeOffIcon />, uncheckedLabel = <>
    <EyeIcon />
    </>
    }) {

    const theLabel = checked ? checkedLabel : uncheckedLabel;

    return (
        <>
            <ToggleButton size={"small"} value="check" selected={checked} onChange={() => onChange(!checked)}>{theLabel}</ToggleButton>
        </>
    )
};