import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { useUser } from 'common/context';
import { Trip } from 'common/types';
import { CreateTripEndpoint } from 'common/utilities';
import { useTrip, useTripFlow } from 'modules/createTrip/context';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';

import { ConfirmButton, LeftButton, RightButton } from './stepButton.style';

export const StepButton = () => {
    const router = useRouter();
    const { user } = useUser();
    const { step, increaseStep, decreaseStep } = useTripFlow();
    const { trip } = useTrip();

    const [{ data: createdTrip }, createTrip] = useAxios<Trip>(
        CreateTripEndpoint(user?.id ?? ''),
        { manual: true }
    );

    const submitOnClick = useCallback(() => {
        createTrip({ data: trip, method: 'post' });
    }, [createTrip, trip]);

    useEffect(() => {
        if (createdTrip) {
            Swal.fire({
                title: 'Congratulations!',
                text: 'Youre trip has been planned successfuly',
                icon: 'success',
            }).then(() => {
                router.push('/profile');
            });
        }
    }, [createdTrip, router]);

    const stepOneButton = (
        <RightButton disabled={trip.destination === ''} onClick={increaseStep}>
            <ArrowForwardIos />
        </RightButton>
    );

    const stepTwoButtons = (
        <>
            <LeftButton onClick={decreaseStep}>
                <ArrowBackIos />
            </LeftButton>
            <RightButton
                disabled={trip.stops.length === 0}
                onClick={increaseStep}
            >
                <ArrowForwardIos />
            </RightButton>
        </>
    );

    const stepThreeButtons = (
        <>
            <LeftButton onClick={decreaseStep}>
                <ArrowBackIos />
            </LeftButton>
            <RightButton onClick={increaseStep}>
                <ArrowForwardIos />
            </RightButton>
        </>
    );

    const stepFourButtons = (
        <>
            <LeftButton onClick={decreaseStep}>
                <ArrowBackIos />
            </LeftButton>
            <ConfirmButton variant="contained" onClick={submitOnClick}>
                Confirm Trip
            </ConfirmButton>
        </>
    );

    return (
        <div>
            {step === 0 && stepOneButton}
            {step === 1 && stepTwoButtons}
            {step === 2 && stepThreeButtons}
            {step === 3 && stepFourButtons}
        </div>
    );
};
