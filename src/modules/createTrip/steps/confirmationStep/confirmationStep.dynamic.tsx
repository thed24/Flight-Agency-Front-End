import dynamic from "next/dynamic";
import { ConfirmationStep } from "./confirmationStep";

export const ConfirmationStepDynamic = dynamic(
  () => import("./confirmationStep").then((mod) => mod.ConfirmationStep as any),
  { ssr: false }
) as typeof ConfirmationStep;
