import {useQuery} from "@tanstack/react-query";
import {createAuthentication} from "../../../api/whalespotter/authentication/createAuthentication";
import useSiwe from "../../../hooks/siwe/useSiwe";
import {getSuggestions} from "../../../api/whalespotter/suggestion/suggestions.js";

export default function useSuggestionHooks(address) {

    const siwe = useSiwe();

    const suggestionQuery = useQuery({
        queryKey: ['account', address, 'suggestions'],
        queryFn: async () => {
            return getSuggestions(address)
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