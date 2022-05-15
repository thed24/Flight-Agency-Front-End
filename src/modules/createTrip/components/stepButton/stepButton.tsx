import { Button } from '@mui/material';
import useAxios from 'axios-hooks';
import { Trip } from 'common/types';
import { CreateTripEndpoint } from 'common/utilities';
import { id } from 'date-fns/locale';
import { useTrip, useTripFlow } from 'modules/createTrip/context';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';

export const StepButton = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const { step, increaseStep, decreaseStep } = useTripFlow();
    const { trip } = useTrip();

    const [{ data: createdTrip }, createTrip] = useAxios<Trip>(
        CreateTripEndpoint(session?.user?.id ?? ''),
        { manual: true }
    );

    const style = {
        margin: 'auto',
        display: 'block',
    };

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
        <Button
            style={style}
            disabled={trip.destination === ''}
            onClick={increaseStep}
        >
            Next Step
        </Button>
    );

    const stepTwoButtons = (
        <>
            <Button style={style} onClick={decreaseStep}>
                Previous Step
            </Button>
            <Button
                disabled={trip.stops.length === 0}
                style={style}
                onClick={increaseStep}
            >
                Next Step
            </Button>
        </>
    );

    const stepThreeButtons = (
        <>
            <Button style={style} onClick={decreaseStep}>
                Previous Step
            </Button>
            <Button style={style} onClick={increaseStep}>
                Next Step
            </Button>
        </>
    );

    const stepFourButtons = (
        <>
            <Button style={style} onClick={decreaseStep}>
                Previous Step
            </Button>
            <Button style={style} onClick={submitOnClick}>
                Confirm
            </Button>
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
