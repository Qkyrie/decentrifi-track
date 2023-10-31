import {useStateWithLocalStorage} from "../../../hooks/useStateWithLocalStorage";

export const useDashboardFilterHooks = () => {
    const [hideSmallValues, setHideSmallValues] = useStateWithLocalStorage('smallValueFilter', 'true')

    const [hideWallet, setHideWallet] = useStateWithLocalStorage('walletFilter', 'false')

    const [hidePoolings, setHidePoolings] = useStateWithLocalStorage('poolingFilter', 'false')

    const [hideFarmings, setHideFarmings] = useStateWithLocalStorage('farmingFilter', 'false')

    const [hideLendings, setHideLendings] = useStateWithLocalStorage('lendingFilter', 'false')

    const [hideBorrowings, setHideBorrowings] = useStateWithLocalStorage('borrowingFilter', 'false')

    const toggleHideSmallValues = () => {
        setHideSmallValues((prevValue) => {
            return prevValue === 'true' ? 'false' : 'true'
        })
    }

    return {
        hideSmallValues: hideSmallValues === 'true',
        toggleHideSmallValues,
        hideWallet: hideWallet === 'true',
        setHidewallet: setHideWallet,
        hidePoolings: hidePoolings === 'true',
        setHidePoolings: setHidePoolings,
        hideFarmings: hideFarmings === 'true',
        setHideFarmings: setHideFarmings,
        hideLendings: hideLendings === 'true',
        setHideLendings: setHideLendings,
        hideBorrowings: hideBorrowings === 'true',
        setHideBorrowings: setHideBorrowings,
    }
}