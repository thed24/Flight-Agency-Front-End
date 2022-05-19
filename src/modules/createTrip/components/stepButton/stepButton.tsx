import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { Trip } from 'common/types';
import { CreateTripEndpoint } from 'common/utilities';
import { useTrip, useTripFlow } from 'modules/createTrip/context';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';

import * as SC from './stepButton.style';

export const StepButton = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { step, increaseStep, decreaseStep } = useTripFlow();
    const { trip } = useTrip();

    const [{ data: createdTrip }, createTrip] = useAxios<Trip>(
        CreateTripEndpoint(session?.user?.id ?? ''),
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
                router.push('/');
            });
        }
    }, [createdTrip, router]);

    const stepOneButton = (
        <SC.RightButton
            disabled={trip.destination === ''}
            onClick={increaseStep}
        >
            <ArrowForwardIos />
        </SC.RightButton>
    );

    const stepTwoButtons = (
        <>
            <SC.LeftButton onClick={decreaseStep}>
                <ArrowBackIos />
            </SC.LeftButton>
            <SC.RightButton
                disabled={trip.stops.length === 0}
                onClick={increaseStep}
            >
                <ArrowForwardIos />
            </SC.RightButton>
        </>
    );

    const stepThreeButtons = (
        <>
            <SC.LeftButton onClick={decreaseStep}>
                <ArrowBackIos />
            </SC.LeftButton>
            <SC.RightButton onClick={increaseStep}>
                <ArrowForwardIos />
            </SC.RightButton>
        </>
    );

    const stepFourButtons = (
        <>
            <SC.LeftButton onClick={decreaseStep}>
                <ArrowBackIos />
            </SC.LeftButton>
            <SC.RightButton onClick={submitOnClick}>
                <ArrowForwardIos />
            </SC.RightButton>
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
