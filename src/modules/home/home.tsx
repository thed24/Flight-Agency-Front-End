import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { GetTripsEndpoint } from "common/utilities";
import { Layout, SC, Divider } from "common/components";
import { Trip } from "common/types";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { IsError, useGet } from "common/hooks";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth";
import { ScrollableTrips } from "./components";

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
  }, [session]);

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
      <SC.Title>Welcome to the Flight Agency, {session?.user?.name}!</SC.Title>
      <SC.SubTitle>View your existing trip, or create a new one</SC.SubTitle>

      {divider}

      <SC.Container>
        {trips && <ScrollableTrips trips={trips} />}

        <Link href={"createTrip"} passHref>
          <Button variant="contained" style={{ marginBottom: "25px" }}>
            Create a new trip
          </Button>
        </Link>
      </SC.Container>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};
