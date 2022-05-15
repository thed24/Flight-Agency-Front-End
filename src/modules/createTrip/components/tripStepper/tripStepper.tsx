import { Step, Stepper } from 'react-form-stepper';

interface Props {
    step: number;
}

export const TripStepper = ({ step }: Props) => (
    <Stepper activeStep={step}>
        <Step label="Select your destination" />
        <Step label="Select your stops" />
        <Step label="Connect your stops" />
        <Step label="Confirm your trip" />
    </Stepper>
);
