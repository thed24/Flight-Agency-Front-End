import { Button } from "@mui/material";
import styles from "./stepButton.module.css";

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
  const stepOneButton = (
    <Button disabled={destination === ""} onClick={confirmDestination}>
      Next Step
    </Button>
  );

  const stepTwoButton = (
    <>
      <Button onClick={() => setStep(step - 1)}>Previous Step</Button>
      <Button onClick={() => setStep(step + 1)}>Next Step</Button>
    </>
  );

  const stepThreeButton = (
    <>
      <Button onClick={() => setStep(step - 1)}>Previous Step</Button>
      <Button onClick={() => setStep(step + 1)}>Confirm Trip</Button>
    </>
  );

  const stepFourButton = (
    <>
      <Button onClick={() => setStep(step - 1)}>Previous Step</Button>
      <Button onClick={() => setStep(step + 1)}>Submit</Button>
    </>
  );

  return (
    <div className={styles.centeredText}>
      {step === 0 && stepOneButton}
      {step === 1 && stepTwoButton}
      {step === 2 && stepThreeButton}
      {step === 3 && stepFourButton}
    </div>
  );
};
