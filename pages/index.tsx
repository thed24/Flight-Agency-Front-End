import * as Components from "../components";
import * as Types from "../types";
import * as Api from "../utilities/api";

import style from "../styles/index.module.css";

import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { Button, MenuItem, Select, Typography } from "@mui/material";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Step, Stepper } from "react-form-stepper";
import GoogleMapReact from "google-map-react";

const Home: NextPage = () => {
  const countries = Types.LoadCountries();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<Date>(new Date());
  const [modalName, setModalName] = useState<string>("");

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

  const modalConfirm = useCallback(() => {
    setTrip({
      ...trip,
      Stops: [
        ...trip.Stops,
        {
          Name: modalName,
          Time: modalValue,
        },
      ],
    });
    setModalOpen(!modalOpen);
  }, [modalName, modalOpen, modalValue, trip]);

  const modalCancel = useCallback(() => {
    setModalOpen(!modalOpen);
    setModalValue(new Date());
    setModalName("");
  }, [modalOpen]);

  function OpenModalWithPlace(place: PlaceData): void {
    setModalOpen(true);
    setModalValue(new Date());
    setModalName(place.name);
  }

  const destinationStep = (
    <>
      <div className={style.container}>
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
      <div className={style.stopStep}>
        <div className={style.maps}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_API_KEY ?? "",
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
          >
            {places.map((place, i) => (
              <Components.Marker
                key={i}
                onClick={() => OpenModalWithPlace(place)}
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
            <Typography component={"div"} key={i}>
              {stop.Name} at {stop.Time.toLocaleString()}
            </Typography>
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
        <Button onClick={() => setStep(step - 1)}> Previous Step </Button>
        <Button onClick={() => {}}> Confirm </Button>
      </div>
    </>
  );

  return (
    <>
      <Components.StopModal
        name={modalName}
        value={modalValue}
        setValue={setModalValue}
        open={modalOpen}
        confirm={modalConfirm}
        setOpen={modalCancel}
        cancel={modalCancel}
      />

      <Components.Layout>
        <Typography className={style.centeredHeader} variant="h4">
          Welcome to the Flight Agency
        </Typography>

        <Typography className={style.centeredText} variant="subtitle1">
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
    </>
  );
};

export default Home;
