// MultiStepForm.js
import dynamic from 'next/dynamic';

import { TripStepper } from './tripStepper';

export const TripStepperDynamic = dynamic(
    () => import('./tripStepper').then((mod) => mod.TripStepper as any),
    {
        ssr: false,
    }
) as typeof TripStepper;
