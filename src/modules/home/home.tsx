import { Button } from '@mui/material';
import useAxios from 'axios-hooks';
import { Divider, Layout, SC } from 'common/components';
import { Trip } from 'common/types';
import { GetTripsEndpoint } from 'common/utilities';
import { NextPage } from 'next';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ScrollableTrips } from './components';

const Home: NextPage = () => {
    const { data: session, status } = useSession();

    const [{ data: trips, loading: tripsLoading }, requestTrips] = useAxios<
        Trip[]
    >(GetTripsEndpoint(session?.user?.id ?? ''), {
        manual: true,
    });

    useEffect(() => {
        if (status === 'authenticated') requestTrips();
    }, [session]);

    return (
        <Layout
            title="Home | Flight Agency"
            loading={tripsLoading || status === 'loading'}
        >
            <SC.Title>
                Welcome to the Flight Agency, {session?.user?.name}!
            </SC.Title>

            <SC.SubTitle>
                View your existing trip, or create a new one
            </SC.SubTitle>

            {trips && trips.length > 0 && <Divider />}

            <SC.Container>
                {trips && trips.length > 0 && <ScrollableTrips trips={trips} />}

                <Link href="createTrip" passHref>
                    <Button variant="contained" style={{ margin: '25px' }}>
                        Create a new trip
                    </Button>
                </Link>
            </SC.Container>
        </Layout>
    );
};

export default Home;
