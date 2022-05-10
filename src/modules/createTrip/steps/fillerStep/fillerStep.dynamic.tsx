import dynamic from 'next/dynamic';

import { FillerStep } from './fillerStep';

export const FillerStepDynamic = dynamic(
    () => import('./fillerStep').then((mod) => mod.FillerStep as any),
    { ssr: false }
) as typeof FillerStep;
