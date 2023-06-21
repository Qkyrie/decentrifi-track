import React from 'react';
import BigNumber from "bignumber.js";
import OrDivider from "../../../components/Divider/OrDivider";
import RequiresApprovalInformation from "./RequiresApprovalInformation";
import HasApprovalInformation from "./HasApprovalInformation";
import {Box, Button, Step, StepLabel, Stepper, Tab, Tabs} from "@mui/material";
import PropTypes from 'prop-types';
import tw from "twin.macro";

const ButtonContainer = tw.div`grid h-20 place-items-center`
const DepositAndWithdrawContainer = tw.div`flex flex-col w-full`

const ApprovalContainer = tw.div`w-full grid justify-items-center mt-10`

const Center = tw.div`flex w-full grid justify-items-center`

function DepositOrWithdraw({farmingViewHooks}) {

    const canWithdraw = () => {
        return farmingViewHooks.staking !== null && new BigNumber(0).isLessThan(new BigNumber(farmingViewHooks.staking.stakedToken.amount))
    }

    return (
        <>
            <DepositAndWithdrawContainer>
                {
                    canWithdraw() && <ButtonContainer>

                        <Button variant={"contained"} color="warning"
                                onClick={farmingViewHooks.withdrawAll}>Withdraw</Button>
                        <OrDivider/>
                    </ButtonContainer>
                }
                <ButtonContainer>
                    <Button variant={"contained"} color="success" onClick={farmingViewHooks.depositAll}>Deposit
                        Everything
                    </Button>
                </ButtonContainer>
            </DepositAndWithdrawContainer>
            <HasApprovalInformation/>
        </>
    );
}

function ApprovalSection({farmingViewHooks}) {

    return (
        <ApprovalContainer>
            <Button onClick={farmingViewHooks.approve} color="secondary"
                    variant={"contained"}>
                Approve
            </Button>
            <RequiresApprovalInformation/>
        </ApprovalContainer>
    );
}


function StatusHeader({farmingViewHooks}) {
    const steps = [
        'approve',
        'deposit',
    ];
    return (
        <Stepper activeStep={farmingViewHooks.approved ? 2 : 1} alternativeLabel>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}

function NativeDepositActions({farmingViewHooks}) {
    if (!farmingViewHooks.approved) {
        return <ApprovalSection farmingViewHooks={farmingViewHooks}/>
    } else {
        return <DepositOrWithdraw farmingViewHooks={farmingViewHooks}/>
    }
}

function FarmSpecificActions() {
    return (
        <>
            <p>There are currently no specific actions for this farm</p>
        </>
    );
}

/*

 */

function DefaultActions({farmingViewHooks}) {
    return (
        <>
            <StatusHeader farmingViewHooks={farmingViewHooks}/>
            <NativeDepositActions farmingViewHooks={farmingViewHooks}/>
        </>
    )
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Actions({farmingViewHooks, token, farmingElement}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <>
            <Center>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="farm actions">
                        <Tab label="Enter Market"/>
                        <Tab label="Leave Market"/>
                    </Tabs>
                </Box>
            </Center>

            <Center>
                <TabPanel value={value} index={0}>
                    <DefaultActions farmingViewHooks={farmingViewHooks}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FarmSpecificActions token={token} farmingElement={farmingElement}/>
                </TabPanel>
            </Center>
        </>
    )
};