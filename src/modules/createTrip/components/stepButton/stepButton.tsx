import { Button } from '@mui/material';
import { useTrip, useTripFlow } from 'modules/createTrip/context';

export const StepButton = () => {
    const { step, increaseStep, decreaseStep } = useTripFlow();
    const { trip } = useTrip();

    const style = {
        margin: 'auto',
        display: 'block',
    };

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
            <Button style={style} onClick={increaseStep}>
                Next Step
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
