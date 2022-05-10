import dynamic from 'next/dynamic';

import { DestinationStep } from './destinationStep';

export const DestinationStepDynamic = dynamic(
    () => import('./destinationStep').then((mod) => mod.DestinationStep as any),
    { ssr: false }
) as typeof DestinationStep;
