import {
    DinnerDining,
    Directions,
    FlightTakeoff,
    ThumbsUpDown,
} from '@mui/icons-material';
import { Step, StepIconProps, StepLabel, Stepper } from '@mui/material';

import * as SC from './tripStepper.style';

interface Props {
    step: number;
}

interface StepData {
    [index: string]: {
        label: string;
        icon: React.ReactElement;
    };
}

const steps: StepData = {
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

const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className, icon } = props;

    return (
        <SC.StepperRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {steps[String(icon)].icon}
        </SC.StepperRoot>
    );
};

export const TripStepper = ({ step }: Props) => (
    <SC.Wrapper>
        <Stepper
            alternativeLabel
            activeStep={step}
            connector={<SC.StepperConnector />}
        >
            {Object.values(steps).map((currStep) => (
                <Step key={currStep.label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                        {currStep.label}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    </SC.Wrapper>
);
