/* eslint-disable react/destructuring-assignment */
import {
    Step,
    StepIconProps,
    StepLabel,
    Stepper as MUIStepper,
} from '@mui/material';

import * as SC from './stepper.style';

interface Props {
    step: number;
    stepData: StepData;
    onClick?: (step: number) => void;
}

interface StepData {
    [index: string]: {
        label: string;
        icon: React.ReactElement;
    };
}

const ColorlibStepIcon = (steps: StepData) => (props: StepIconProps) => {
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

export const Stepper = ({ step, onClick, stepData }: Props) => (
    <SC.Wrapper>
        <MUIStepper
            alternativeLabel
            activeStep={step}
            connector={<SC.StepperConnector />}
        >
            {Object.values(stepData).map((currStep, index) => (
                <Step
                    onClick={() => (onClick ? onClick(index) : null)}
                    key={currStep.label}
                >
                    <StepLabel StepIconComponent={ColorlibStepIcon(stepData)}>
                        {currStep.label}
                    </StepLabel>
                </Step>
            ))}
        </MUIStepper>
    </SC.Wrapper>
);
