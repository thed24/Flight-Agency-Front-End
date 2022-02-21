import * as Components from "../components";
import * as Types from "../types";
import * as Api from "../utilities/api";

import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Step, Stepper } from "react-form-stepper";
import GoogleMapReact from "google-map-react";

const Home: NextPage = () => {
  const countries = Types.LoadCountries();
  const [step, setStep] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [trip, setTrip] = useState<Types.Trip>({ Stops: [] });
  const [zoom, setZoom] = useState<number>(15);
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [center, setCenter] = useState<Types.Location>({
    lat: -37.840935,
    lng: 144.946457,
  });

  useEffect(() => {
    async function CallApi() {
      const response = await Api.RequestLocationData({
        location: center,
        zoom: zoom,
        radius: 2000,
      });

      if (response) setPlaces(response.results as PlaceData[]);
    }

    CallApi();
  }, [center, zoom]);

  const confirmDestinationOnClick = useCallback(() => {
    const currentCountry = countries.find(
      (country) => country.name === destination
    );

    if (currentCountry) {
      setCenter({ lat: currentCountry.lat, lng: currentCountry.lng });
      setStep(step + 1);
    }
  }, [countries, destination, step]);

  function AddOrRemovePlaceOnClick(place: PlaceData): MouseEventHandler {
    return () =>
      setTrip({
        Stops: [
          ...trip.Stops,
          {
            Name: place.name,
            Location: place.geometry.location,
          },
        ],
      });
  }

  const destinationStep = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Please select your destination</Typography>
        <Select
          style={{
            width: "25%",
            margin: "30px",
          }}
          placeholder="Select a country"
          value={destination}
          label="Destination"
          onChange={(e) => setDestination(e.target.value)}
        >
          {countries.map((c, index) => {
            return (
              <MenuItem value={c.name} key={index}>
                {c.name}
              </MenuItem>
            );
          })}
        </Select>

        <Button
          disabled={destination === ""}
          onClick={confirmDestinationOnClick}
        >
          Next Step
        </Button>
      </div>
    </>
  );

  const stopStep = (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            height: "50vh",
            width: "75vh",
            flex: 1,
            marginLeft: "100px",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map((place, i) => (
              <Components.Marker
                key={i}
                onClick={AddOrRemovePlaceOnClick(place)}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                text={place.name}
              />
            ))}
          </GoogleMapReact>
        </div>

        <div style={{ marginRight: "100px", marginLeft: "100px" }}>
          <Typography gutterBottom variant="h4">
            Planned Stops
          </Typography>
          {trip.Stops.map((stop, i) => (
            <Typography key={i}>{stop.Name}</Typography>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setStep(step + 1)}> Next Step </Button>
        <Button onClick={() => setStep(step - 1)}> Previous Step </Button>
      </div>
    </>
  );

  return (
    <Components.Layout>
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
        variant="h4"
      >
        Welcome to the Flight Agency
      </Typography>

      <Typography
        variant="subtitle1"
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "20px",
          margin: "auto",
        }}
      >
        Build your trip below
      </Typography>

      <div style={{ display: "flex" }}>
        <Stepper activeStep={step}>
          <Step label="Select your destination" />
          <Step label="Select your stops" />
        </Stepper>
      </div>

      {step === 0 && destinationStep}
      {step === 1 && stopStep}
    </Components.Layout>
  );
};

export default Home;
