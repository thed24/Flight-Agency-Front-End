import dynamic from "next/dynamic";
import { LoadingOverlay } from "./loadingOverlay";

export const LoadingOverlayDynamic = dynamic(
  () => import("./loadingOverlay").then((mod) => mod.LoadingOverlay as any),
  { ssr: false }
) as typeof LoadingOverlay;
