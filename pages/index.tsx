import { Button, Divider } from "@mui/material";

import { useEffect, useState } from "react";

import {
  GetTripsEndpoint,
  getFromStorage,
  GetSuggestionsEndpoint,
} from "utilities";
import {
  Layout,
  ConfirmationList,
  SetApiKey,
  SubTitle,
  Title,
  Container,
} from "components";
import { Stop, Trip, User } from "types";
import { NextPage } from "next";
import Link from "next/link";
import { useGet } from "hooks";

const Home: NextPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const loggedInUser = getFromStorage<User>("loggedInUser");

  const {
    request: requestTrips,
    loading: tripsLoading,
    payload: tripsPayload,
  } = useGet<Trip[]>(GetTripsEndpoint);

  useEffect(() => {
    if (loggedInUser) requestTrips();
  }, []);

  useEffect(() => {
    setTrips(tripsPayload?.data ? tripsPayload.data : []);
  }, [tripsPayload]);

  return (
    <>
      <Layout>
        <Title>Welcome to the Flight Agency, {loggedInUser?.name}!</Title>

        <SubTitle>View your existing trip, or create a new one</SubTitle>

        {trips.length > 0 && <Divider />}

        <Container>
          {trips &&
            trips.map((trip, i) => (
              <div key={i}>
                <Title>
                  Trip {i + 1}: {trip.destination}
                </Title>
                <ConfirmationList key={i} trip={trip} />
              </div>
            ))}

          {trips.length > 0 && <Divider />}

          <Link href={"createTrip"} passHref>
            <Button> Create a new trip </Button>
          </Link>

          <SetApiKey />
        </Container>
      </Layout>
    </>
  );
};

export default Home;
