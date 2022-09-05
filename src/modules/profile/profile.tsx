import useAxios from 'axios-hooks';
import { Button, Container, Layout, SubTitle, Title } from 'common/components';
import { Trip } from 'common/types';
import { GetTripsEndpoint } from 'common/utilities';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { ScrollableTrips } from './components';

const Profile: NextPage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

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
            title="Home | Agai"
            loading={tripsLoading || status === 'loading'}
        >
            <Title>Welcome back to Agai, {session?.user?.name}!</Title>
            <SubTitle marginBottom={4}>
                View your existing trips, or plan a new one
            </SubTitle>

            <Container>
                {trips && trips.length > 0 && <ScrollableTrips trips={trips} />}
                <Button onClick={() => router.push('/createTrip')}>
                    Create a new trip
                </Button>
            </Container>
        </Layout>
    );
};

export default Profile;
