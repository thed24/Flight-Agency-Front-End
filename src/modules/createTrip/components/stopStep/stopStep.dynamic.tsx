import dynamic from "next/dynamic";
import { StopStep } from "./stopStep";

export const StopStepDynamic = dynamic(
  () => import("./stopStep").then((mod) => mod.StopStep as any),
  { ssr: false }
) as typeof StopStep;
