import { User } from 'common/types';
import { useCallback, useContext } from 'react';

import { UserContext } from './userContext';

export function useUser() {
    const [{ user }, dispatch] = useContext(UserContext);

    const login = useCallback(
        (newUser: User) => dispatch('login', newUser),
        [dispatch]
    );

    const logout = useCallback(() => dispatch('logout', null), [dispatch]);

    return {
        login,
        logout,
        user,
    };
}
