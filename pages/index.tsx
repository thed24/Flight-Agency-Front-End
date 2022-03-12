import * as Components from "../components";
import * as Types from "../types";
import * as Api from "../utilities/api";

import style from "../styles/index.module.css";

import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { Typography } from "@mui/material";
import { PlaceData } from "@googlemaps/google-maps-services-js";
import { Step, Stepper } from "react-form-stepper";

const Home: NextPage = () => {
  const countries = Types.LoadCountries();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<Types.DateRange>({
    start: new Date(),
    end: new Date(),
  });
  const [modalPlace, setModalPlace] = useState<PlaceData | null>(null);

  const [category, setCategory] = useState<string>("Food");
  const [step, setStep] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [trip, setTrip] = useState<Types.Trip>({ Stops: [], Destination: "" });
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
        keyword: `'${category}'`,
      });

      if (response) setPlaces(response.results as PlaceData[]);
    }

    CallApi();
  }, [category, center, zoom]);

  useEffect((): void => {
    async function CallApi() {
      await Api.CreateTrip({ ...trip });
    }

    if (step === 4) CallApi(); // todo: fix
  }, [step, category, center, zoom, trip]);

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
    if (modalPlace !== null) {
      setTrip({
        ...trip,
        Destination: destination,
        Stops: [
          ...trip.Stops,
          {
            Name: modalPlace.name,
            Time: modalValue,
            Address: modalPlace.vicinity,
            Location: {
              lat: modalPlace.geometry.location.lat,
              lng: modalPlace.geometry.location.lng,
            },
          },
        ],
      });
    }
    setModalOpen(!modalOpen);
  }, [modalPlace, modalOpen, trip, destination, modalValue]);

  const modalCancel = useCallback(() => {
    setModalOpen(!modalOpen);
    setModalValue({
      start: new Date(),
      end: new Date(),
    });
    setModalPlace(null);
  }, [modalOpen]);

  function OpenModalWithPlace(place: PlaceData): void {
    setModalOpen(true);
    setModalValue({
      start: new Date(),
      end: new Date(),
    });
    setModalPlace(place);
  }

  return (
    <>
      <Components.StopModal
        place={modalPlace}
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
            <Step label="Connect your stops" />
            <Step label="Confirm your trip" />
          </Stepper>
        </div>

        {step === 0 && (
          <Components.DestinationStep
            destination={destination}
            onChange={setDestination}
          />
        )}

        {step === 1 && (
          <Components.StopStep
            center={center}
            zoom={zoom}
            places={places}
            trip={trip}
            onClickMarker={OpenModalWithPlace}
            onChangeCategory={setCategory}
            category={category}
          />
        )}

        {step === 2 && (
          <Components.FillerStep center={center} zoom={zoom} trip={trip} />
        )}

        {step === 3 && <Components.ConfirmationStep trip={trip} />}

        <Components.StepButton
          step={step}
          setStep={setStep}
          destination={destination}
          confirmDestination={confirmDestinationOnClick}
        />
      </Components.Layout>
    </>
  );
};

export default Home;
