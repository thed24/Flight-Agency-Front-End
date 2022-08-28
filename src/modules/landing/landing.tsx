import { Box, Stack, Typography } from '@mui/material';
import { Layout, SC } from 'common/components';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';

import { LandingStepper } from './components/landingStepper';

const Landing: NextPage = () => {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();

    const content = useMemo(() => {
        switch (step) {
            case 0:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Find exciting places to visit on your trip, with
                        recommendations tailored for you.
                    </Typography>,
                    <Image
                        alt="Space imagery"
                        key={`${step}-image`}
                        src="/undraw_planet.svg"
                        style={{ float: 'right' }}
                        height={800}
                        width={800}
                    />,
                ];
            case 1:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Add additional stops and configure your day to day
                        schedule.
                    </Typography>,
                    <Image
                        alt="Navigation imagery"
                        key={`${step}-image`}
                        src="/undraw_navigation.svg"
                        style={{ float: 'right' }}
                        height={800}
                        width={800}
                    />,
                ];
            case 2:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Save and export your trip to your favorite calendar app!
                    </Typography>,
                    <Image
                        alt="Travel imagery"
                        key={`${step}-image`}
                        src="/undraw_travel.svg"
                        style={{ float: 'right' }}
                        height={800}
                        width={800}
                    />,
                ];
            default:
                return [
                    <Typography
                        key={`${step}-text`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Oops, something went wrong.
                    </Typography>,
                    <Typography
                        key={`${step}-image`}
                        fontSize={35}
                        fontWeight={300}
                    >
                        Please try again later.
                    </Typography>,
                ];
        }
    }, [step]);

    return (
        <Layout title="Home | Flight Agency">
            <Box
                flex={1}
                display="flex"
                flexDirection="row"
                alignItems="center"
                marginLeft="5%"
                gap="10%"
            >
                <Box width="30%" marginLeft={15}>
                    <Typography fontSize={50} fontWeight={400}>
                        With Flight Agency, planning your next trip has never
                        been so easy!
                    </Typography>

                    {content[0]}

                    <Stack width="85%" marginTop={5} gap={5} direction="row">
                        {session ? (
                            <>
                                <SC.Button
                                    onClick={() => router.push('profile')}
                                    variant="contained"
                                    fullWidth
                                >
                                    Profile
                                </SC.Button>
                                <SC.Button
                                    onClick={async () => {
                                        await signOut({ redirect: false });
                                        router.push('/');
                                    }}
                                    fullWidth
                                >
                                    Sign Out
                                </SC.Button>
                            </>
                        ) : (
                            <>
                                <SC.Button
                                    onClick={() => router.push('auth/login')}
                                    variant="contained"
                                    fullWidth
                                >
                                    Login
                                </SC.Button>
                                <SC.Button
                                    onClick={() => router.push('auth/register')}
                                    fullWidth
                                >
                                    Sign Up
                                </SC.Button>
                            </>
                        )}
                    </Stack>
                </Box>

                <Box alignItems="right" marginTop={10}>
                    {content[1]}
                </Box>
            </Box>

            <Box width="60%" margin="auto">
                <LandingStepper step={step} onClick={(x) => setStep(x)} />
            </Box>
        </Layout>
    );
};

export default Landing;
