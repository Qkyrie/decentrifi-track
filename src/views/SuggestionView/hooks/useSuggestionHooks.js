import {useQuery} from "@tanstack/react-query";
import {createAuthentication} from "../../../api/whalespotter/authentication/createAuthentication";
import useSiwe from "../../../hooks/siwe/useSiwe";
import {getSuggestions} from "../../../api/whalespotter/suggestion/suggestions.js";

export default function useSuggestionHooks(address) {

    const siwe = useSiwe();

    const suggestionQuery = useQuery({
        queryKey: ['account', address, 'suggestions'],
        queryFn: async () => {
            if (siwe.isAuthenticated()) {
                const auth = createAuthentication({
                    owner: siwe.owner,
                    signature: await siwe.getSignature(),
                    message: await siwe.getMessage()
                });
                return getSuggestions(
                    address,
                    auth
                )
            } else {
                return []
            }
        }
    })

    const dismiss = function () {
        console.log("dismiss")
    };

    return {
        suggestions: suggestionQuery.data || [],
        isLoading: suggestionQuery.isLoading,
        dismiss
    }
};