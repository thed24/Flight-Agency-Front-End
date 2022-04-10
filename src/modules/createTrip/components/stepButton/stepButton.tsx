import { Button } from "@mui/material";
import { Trip } from "common/types";

interface Props {
  step: number;
  setStep: (step: number) => void;
  destination: string;
  trip: Trip;
}

export const StepButton = ({ step, setStep, destination, trip }: Props) => {
  const style = {
    margin: "auto",
    display: "block",
  };

  const handleIncreaseStep = () => {
    setStep(step + 1);
  };

  const handleDecreaseStep = () => {
    setStep(step - 1);
  };

  const stepOneButton = (
    <Button
      style={style}
      disabled={destination === ""}
      onClick={handleIncreaseStep}
    >
      Next Step
    </Button>
  );

  const stepTwoButtons = (
    <>
      <Button style={style} onClick={handleDecreaseStep}>
        Previous Step
      </Button>
      <Button
        disabled={trip.stops.length === 0}
        style={style}
        onClick={handleIncreaseStep}
      >
        Next Step
      </Button>
    </>
  );

  const stepThreeButtons = (
    <>
      <Button style={style} onClick={handleDecreaseStep}>
        Previous Step
      </Button>
      <Button style={style} onClick={handleIncreaseStep}>
        Next Step
      </Button>
    </>
  );

  const stepFourButtons = (
    <>
      <Button style={style} onClick={handleDecreaseStep}>
        Previous Step
      </Button>
      <Button style={style} onClick={handleIncreaseStep}>
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
