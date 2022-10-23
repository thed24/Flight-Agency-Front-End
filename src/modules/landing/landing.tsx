import { Grid, Stack, Typography } from '@mui/material';
import { Button, Layout } from 'common/components';
import { useUser } from 'common/context';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import navImage from '../../../public/undraw_navigation.svg';
import spaceImage from '../../../public/undraw_planet.svg';
import travelImage from '../../../public/undraw_travel.svg';
import { LandingStepper } from './components/landingStepper';

const Landing: NextPage = () => {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const { user, logout } = useUser();

    const content = useMemo(() => {
        switch (step) {
            case 0:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize="3vmin"
                        fontWeight={300}
                    >
                        Find exciting places to visit on your trip, with
                        recommendations tailored for you.
                    </Typography>,
                    <Image
                        alt="Space imagery"
                        key={`${step}-image`}
                        src={spaceImage}
                    />,
                ];
            case 1:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize="3vmin"
                        fontWeight={300}
                    >
                        Add additional stops and configure your day to day
                        schedule.
                    </Typography>,
                    <Image
                        alt="Navigation imagery"
                        key={`${step}-image`}
                        src={navImage}
                    />,
                ];
            case 2:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize="3vmin"
                        fontWeight={300}
                    >
                        Save and export your trip to your favorite calendar app!
                    </Typography>,
                    <Image
                        alt="Travel imagery"
                        key={`${step}-image`}
                        src={travelImage}
                    />,
                ];
            default:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize="3vmin"
                        fontWeight={300}
                    >
                        Oops, something went wrong.
                    </Typography>,
                    <Typography
                        key={`${step}-image`}
                        fontSize="3vmin"
                        fontWeight={300}
                    >
                        Please try again later.
                    </Typography>,
                ];
        }
    }, [step]);

    return (
        <Layout title="Home | Agai">
            <Grid gap={2} container justifyContent="center" alignItems="center">
                <Grid item ml="18%" mt={15} mb={20} xs={3}>
                    <Typography fontSize="4vmin" fontWeight={400}>
                        With Agai, planning your next trip has been so easy!
                    </Typography>

                    {content[0]}

                    <Stack mt={5} mr={2} gap={5} direction="row">
                        {user ? (
                            <>
                                <Button
                                    onClick={() => router.push('profile')}
                                    variant="contained"
                                    fullWidth
                                >
                                    Profile
                                </Button>
                                <Button
                                    onClick={async () => {
                                        logout();
                                        router.push('/');
                                    }}
                                    fullWidth
                                >
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => router.push('auth/login')}
                                    variant="contained"
                                    fullWidth
                                >
                                    Login
                                </Button>
                                <Button
                                    onClick={() => router.push('auth/register')}
                                    fullWidth
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Stack>
                </Grid>

                <Grid item xs justifyItems="center">
                    {content[1]}
                </Grid>

                <Grid xs={12} item marginTop={5}>
                    <LandingStepper step={step} onClick={(x) => setStep(x)} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default Landing;
