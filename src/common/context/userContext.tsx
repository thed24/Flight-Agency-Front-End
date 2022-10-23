import { createContext, useCallback, useMemo, useReducer } from 'react';

import { Actions, ActionsMap, userReducer, UserState } from './userReducer';

export type Dispatcher = <
    Type extends Actions['type'],
    Payload extends ActionsMap[Type]
>(
    type: Type,
    ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

type UserContextInterface = readonly [UserState, Dispatcher];

export const UserContext = createContext<UserContextInterface>([
    {
        user: null,
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
]);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, _dispatch] = useReducer(userReducer, {
        user: null,
    });

    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({ type, payload: payload[0] } as Actions);
    }, []);

    const value = useMemo(
        () => [state, dispatch] as [UserState, Dispatcher],
        [state, dispatch]
    );

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
