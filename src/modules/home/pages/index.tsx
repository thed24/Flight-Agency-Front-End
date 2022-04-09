import { Button, Divider } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { GetTripsEndpoint } from "common/utilities";
import {
  Layout,
  SubTitle,
  Title,
  Container,
  ConfirmationList,
} from "common/components";
import { Trip } from "common/types";
import { NextPage } from "next";
import Link from "next/link";
import { IsError, useGet } from "common/hooks";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { data: session, status } = useSession();

  const {
    request: requestTrips,
    loading: tripsLoading,
    payload: tripsPayload,
  } = useGet<Trip[]>(GetTripsEndpoint(session?.user?.id ?? ""));

  useEffect(() => {
    if (session) requestTrips();
  }, []);

  useEffect(() => {
    setTrips(IsError(tripsPayload) ? [] : tripsPayload.data);
  }, [tripsPayload]);

  const divider = useMemo(
    () => trips.length > 0 && <Divider />,
    [trips.length]
  );

  const isLoading = useMemo(
    () => tripsLoading || status === "loading",
    [tripsLoading, status]
  );

  return (
    <Layout loading={isLoading}>
      <Title>Welcome to the Flight Agency, {session?.user?.name}!</Title>

      <SubTitle>View your existing trip, or create a new one</SubTitle>

      {divider}

      <Container>
        {trips &&
          trips.map((trip, i) => (
            <div key={i}>
              <SubTitle>
                Trip {i + 1}: {trip.destination}
              </SubTitle>
              <ConfirmationList key={i} trip={trip} />
            </div>
          ))}

        {divider}

        <Link href={"createTrip"} passHref>
          <Button style={{ marginBottom: "25px" }}>Create a new trip</Button>
        </Link>
      </Container>
    </Layout>
  );
};

export default Home;
