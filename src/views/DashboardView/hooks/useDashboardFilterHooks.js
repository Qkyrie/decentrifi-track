import {useStateWithLocalStorage} from "../../../hooks/useStateWithLocalStorage";

export const useDashboardFilterHooks = () => {
    const [hideSmallValues, setHideSmallValues] = useStateWithLocalStorage('smallValueFilter', 'false')

    const [hideWallet, setHideWallet] = useStateWithLocalStorage('walletFilter', 'false')

    const [hidePoolings, setHidePoolings] = useStateWithLocalStorage('poolingFilter', 'false')

    const [hideFarmings, setHideFarmings] = useStateWithLocalStorage('farmingFilter', 'false')

    const [hideLendings, setHideLendings] = useStateWithLocalStorage('lendingFilter', 'false')

    const [hideBorrowings, setHideBorrowings] = useStateWithLocalStorage('borrowingFilter', 'false')

    return {
        hideSmallValues: hideSmallValues === 'true',
        setHideSmallValues: setHideSmallValues,
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