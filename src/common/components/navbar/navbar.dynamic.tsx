import dynamic from 'next/dynamic';

import { NavBar } from './navbar';

export const NavBarDynamic = dynamic(
    () => import('./navbar').then((mod) => mod.NavBar as any),
    { ssr: false }
) as typeof NavBar;
