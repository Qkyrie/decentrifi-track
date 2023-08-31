import swal from "sweetalert";
import {Button} from "@mui/material";
import React, {useState} from "react";
import useWeb3 from "../../../../hooks/web3";
import {useExitPosition} from "../../../../hooks/useExitPosition";
import tw from "twin.macro";
import spinner from "../../../../images/spinner.gif";
import styled from "styled-components";

const ButtonContent = styled.div`
  ${tw`flex flex-row`}
  span {
    ${tw`align-middle`}
    img {
      ${tw`h-5`}
    }
  }

  span {
    ${tw`mx-3 align-middle`}
  }
`

export function ExitButton({element}) {

    const [state, setState] = useState('default')

    const web3 = useWeb3()
    const {
        exit
    } = useExitPosition(web3);

    return (
        <Button disabled={state === 'pending'} onClick={
            async (e) => {
                e.stopPropagation()
                try {
                    setState('pending')
                    await exit(element);
                } catch (err) {
                    setState('error')
                    swal({
                        text: err.message,
                        icon: "error"
                    });
                }
            }
        } variant={"contained"}>
            <ButtonContent>
                {state === 'pending' &&
                    <span>
                        <img alt="spinner" src={spinner}/>
                    </span>
                }
                <span>Exit Position</span>
            </ButtonContent>
        </Button>
    )
}