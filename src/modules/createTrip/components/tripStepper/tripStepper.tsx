import {
    DinnerDining,
    Directions,
    FlightTakeoff,
    ThumbsUpDown,
} from '@mui/icons-material';
import { Stepper } from 'common/components';

interface Props {
    step: number;
}

const steps = {
    1: {
        label: 'Choose a destination',
        icon: <FlightTakeoff />,
    },
    2: {
        label: 'Select your stops',
        icon: <DinnerDining />,
    },
    3: {
        label: 'Connect your stops',
        icon: <Directions />,
    },
    4: {
        label: 'Confirm your trip',
        icon: <ThumbsUpDown />,
    },
};

export const TripStepper = ({ step }: Props) => (
    <Stepper step={step} stepData={steps} />
);
