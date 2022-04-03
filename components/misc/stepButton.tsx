import { Button } from "@mui/material";

interface Props {
  step: number;
  setStep: (step: number) => void;
  destination: string;
  confirmDestination: () => void;
}

export const StepButton = ({
  step,
  setStep,
  destination,
  confirmDestination,
}: Props) => {
  const style = {
    margin: "auto",
    display: "block",
  };

  const destinationStepButton = (
    <Button
      style={style}
      disabled={destination === ""}
      onClick={confirmDestination}
    >
      Next Step
    </Button>
  );

  const otherStepsButton = (
    <>
      <Button style={style} onClick={() => setStep(step - 1)}>
        Previous Step
      </Button>
      <Button style={style} onClick={() => setStep(step + 1)}>
        Next Step
      </Button>
    </>
  );

  return (
    <div>
      {step === 0 && destinationStepButton}
      {step === 1 && otherStepsButton}
      {step === 2 && otherStepsButton}
      {step === 3 && otherStepsButton}
    </div>
  );
};
