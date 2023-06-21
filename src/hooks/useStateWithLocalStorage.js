import React from 'react';

export const useStateWithLocalStorage = (localStorageKey, initialValue) => {
    const [value, setValue] = React.useState(
        localStorage.getItem(localStorageKey) || initialValue
    );

    React.useEffect(() => {
        localStorage.setItem(localStorageKey, value);
    }, [value]);

    return [value, setValue];
}