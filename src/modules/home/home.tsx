import { Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { GetTripsEndpoint } from 'common/utilities';
import { Layout, SC, Divider } from 'common/components';
import { Trip } from 'common/types';
import { NextPage } from 'next';
import Link from 'next/link';
import { IsError, useGet } from 'common/hooks';
import { useSession } from 'next-auth/react';
import { ScrollableTrips } from './components';
import Head from 'next/head';

const Home: NextPage = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const { data: session, status } = useSession();

    const {
        request: requestTrips,
        loading: tripsLoading,
        payload: tripsPayload,
    } = useGet<Trip[]>(GetTripsEndpoint(session?.user?.id ?? ''));

    useEffect(() => {
        if (session) requestTrips();
    }, [session]);

    useEffect(() => {
        setTrips(IsError(tripsPayload) ? [] : tripsPayload.data);
    }, [tripsPayload]);

    const divider = useMemo(
        () => trips.length > 0 && <Divider />,
        [trips.length]
    );

    const isLoading = useMemo(
        () => tripsLoading || status === 'loading',
        [tripsLoading, status]
    );

    return (
        <Layout title={'Home | Flight Agency'} loading={isLoading}>
            <SC.Title>
                Welcome to the Flight Agency, {session?.user?.name}!
            </SC.Title>
            <SC.SubTitle>
                View your existing trip, or create a new one
            </SC.SubTitle>

            {divider}

            <SC.Container>
                {trips.length > 0 && <ScrollableTrips trips={trips} />}

                <Link href={'createTrip'} passHref>
                    <Button variant="contained" style={{ margin: '25px' }}>
                        Create a new trip
                    </Button>
                </Link>
            </SC.Container>
        </Layout>
    );
};

export default Home;
