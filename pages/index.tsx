import * as Components from "../components";
import * as Types from "../types";
import * as Api from "../utilities/api";

import style from "../styles/index.module.css";
import { Button, Divider, Input, InputLabel, Typography } from "@mui/material";
import { NextPage } from "next";
import { getFromStorage, setInStorage } from "../utilities/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [trips, setTrips] = useState<Types.Trip[] | null>(null);
  const loggedInUser = getFromStorage<Types.User>("loggedInUser");

  useEffect(() => {
    async function CallApi() {
      const response = await Api.GetTrips();
      if (response) setTrips(response);
    }

    if (loggedInUser) CallApi();
  }, [loggedInUser]);

  return (
    <>
      <Components.Layout>
        <Typography className={style.centeredHeader} variant="h4">
          Welcome to the Flight Agency, {loggedInUser?.name}!
        </Typography>

        <Typography className={style.centeredText} variant="subtitle1">
          View your existing trip, or create a new one
        </Typography>

        <Divider />

        <div className={style.container}>
          {trips &&
            trips.map((trip, i) => (
              <div key={i}>
                <Typography className={style.tripTitle} variant="h6">
                  Trip {i + 1}: {trip.destination}
                </Typography>
                <Components.ConfirmationList key={i} trip={trip} />
              </div>
            ))}

          <Divider />

          <Link href={"createTrip"} passHref>
            <Button> Create a new trip </Button>
          </Link>

          <Components.SetApiKey />
        </div>
      </Components.Layout>
    </>
  );
};

export default Home;
