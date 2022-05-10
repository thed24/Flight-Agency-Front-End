import { useCallback, useContext } from 'react';

import { CreateTripContext } from './createTripContext';

export function useTripFlow() {
    const [{ step }, dispatch] = useContext(CreateTripContext);

    const setStep = useCallback(
        (newStep: number) => dispatch('setStep', newStep),
        [dispatch]
    );
    const increaseStep = useCallback(
        () => dispatch('increaseStep'),
        [dispatch]
    );
    const decreaseStep = useCallback(
        () => dispatch('decreaseStep'),
        [dispatch]
    );

    return {
        step,
        setStep,
        increaseStep,
        decreaseStep,
    };
}
