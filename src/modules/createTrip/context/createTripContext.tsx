import { createContext, useCallback, useMemo, useReducer } from 'react';

import {
    Actions,
    ActionsMap,
    createTripReducer,
    CreateTripState,
} from './createTripReducer';

export type Dispatcher = <
    Type extends Actions['type'],
    Payload extends ActionsMap[Type]
>(
    type: Type,
    ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

type CreateTripContextInterface = readonly [CreateTripState, Dispatcher];

export const CreateTripContext = createContext<CreateTripContextInterface>([
    {
        trip: { length: 0, id: 0, destination: '', stops: [] },
        step: 0,
        zoom: 10,
        center: { latitude: 0, longitude: 0 },
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
]);

export const CreateTripProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, _dispatch] = useReducer(createTripReducer, {
        trip: { length: 0, id: 0, destination: '', stops: [] },
        step: 0,
        zoom: 17,
        center: { latitude: 0, longitude: 0 },
    });

    const dispatch: Dispatcher = useCallback((type, ...payload) => {
        _dispatch({ type, payload: payload[0] } as Actions);
    }, []);

    const value = useMemo(
        () => [state, dispatch] as [CreateTripState, Dispatcher],
        [state, dispatch]
    );

    return (
        <CreateTripContext.Provider value={value}>
            {children}
        </CreateTripContext.Provider>
    );
};
