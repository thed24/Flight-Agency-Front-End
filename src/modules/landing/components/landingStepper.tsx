import { DinnerDining, Directions, FlightTakeoff } from '@mui/icons-material';
import { Stepper } from 'common/components';

interface Props {
    step: number;
    onClick: (step: number) => void;
}

const steps = {
    1: {
        label: 'Plan your trip',
        icon: <FlightTakeoff />,
    },
    2: {
        label: 'Tweak your schedule',
        icon: <DinnerDining />,
    },
    3: {
        label: 'Save your trip',
        icon: <Directions />,
    },
};

export const LandingStepper = ({ step, onClick }: Props) => (
    <Stepper step={step} stepData={steps} onClick={onClick} />
);
