export function createAuthentication(authentication) {
    return {
        'owner': authentication.owner,
        'Authentication': btoa(authentication.signature),
        'AuthenticationMessage': btoa(authentication.message)
    }
}