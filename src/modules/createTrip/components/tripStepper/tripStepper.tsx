import { Step, Stepper } from 'react-form-stepper';

import * as SC from './tripStepper.style';

interface Props {
    step: number;
}

export const TripStepper = ({ step }: Props) => (
    <SC.Wrapper>
        <Stepper activeStep={step}>
            <Step label="Select your destination" />
            <Step label="Select your stops" />
            <Step label="Connect your stops" />
            <Step label="Confirm your trip" />
        </Stepper>
    </SC.Wrapper>
);
