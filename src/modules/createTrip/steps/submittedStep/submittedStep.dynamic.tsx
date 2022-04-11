import dynamic from "next/dynamic";
import { SubmittedStep } from "./submittedStep";

export const SubmittedStepDynamic = dynamic(
  () => import("./submittedStep").then((mod) => mod.SubmittedStep as any),
  { ssr: false }
) as typeof SubmittedStep;
