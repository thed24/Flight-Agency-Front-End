import dynamic from "next/dynamic";
import { StopModal } from "./stopModal";

export const StopModalDynamic = dynamic(
  () => import("./stopModal").then((mod) => mod.StopModal as any),
  { ssr: false }
) as typeof StopModal;
