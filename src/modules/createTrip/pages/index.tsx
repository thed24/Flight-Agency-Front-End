import { useCallback, useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import {
  Layout,
  StepButton,
  Title,
  SubTitle,
  Container,
} from "common/components";
import {
  DateRange,
  Location,
  LoadCountries,
  Place,
  Places,
  PlacesRequest,
  Trip,
  Stop,
  Addresses,
  AddressRequest,
} from "common/types";
import {
  RequestLocationDataEndpoint,
  CreateTripEndpoint,
  RequestAddressEndpoint,
} from "common/utilities";
import { GetServerSideProps, NextPage } from "next";
import { IsError, useGet, usePost } from "common/hooks";
import {
  ConfirmationStep,
  StopStep,
  FillerStep,
  SubmittedStep,
  DestinationStep,
  StopModal,
} from "modules/createTrip";
import { getSession, useSession } from "next-auth/react";
import { TextField } from "@mui/material";
import { Session } from "next-auth";

const CreateTrip: NextPage = () => {
  const { data: session } = useSession();

  const countries = LoadCountries();

  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });

  const [step, setStep] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [trip, setTrip] = useState<Trip>({
    id: 0,
    stops: [],
    destination: "",
  });

  const [zoom, setZoom] = useState<number>(15);
  const [center, setCenter] = useState<Location>({
    lat: -37.840935,
    lng: 144.946457,
  });

  const [apiKey, setApiKey] = useState<string>("");

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
        destination: destination,
        stops: [
          ...trip.stops,
          {
            name: modalPlace.name,
            time: modalValue,
            address: modalPlace.vicinity,
            location: {
              lat: modalPlace.geometry.location.latitude,
              lng: modalPlace.geometry.location.longitude,
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

  const openModalWithPlace = (place: Place) => {
    setModalOpen(true);
    setModalValue({
      start: new Date(),
      end: new Date(),
    });
    setModalPlace(place);
  };

  const onMoveMap = (lat: number, lng: number) => {
    setCenter({ lat: lat, lng: lng });
  };

  const onBlurApiKey = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setApiKey(e.target.value);
    },
    [setApiKey]
  );

  const onNewStopAdded = (stop: Stop) =>
    setTrip({
      ...trip,
      stops: [...trip.stops, stop],
    });

  return (
    <>
      <StopModal
        place={modalPlace}
        value={modalValue}
        setValue={setModalValue}
        open={modalOpen}
        confirm={modalConfirm}
        setOpen={modalCancel}
        cancel={modalCancel}
      />

      <Layout>
        <Title> Welcome to the Flight Agency </Title>
        <SubTitle> Build your trip below </SubTitle>

        <Container>
          <Stepper activeStep={step}>
            <Step label="Select your destination" />
            <Step label="Select your stops" />
            <Step label="Connect your stops" />
            <Step label="Confirm your trip" />
            <Step label="Trip confirmed" />
          </Stepper>
        </Container>

        {step === 0 && (
          <DestinationStep
            destination={destination}
            onChange={setDestination}
          />
        )}

        {step === 1 && (
          <StopStep
            center={center}
            zoom={zoom}
            trip={trip}
            onClickMarker={openModalWithPlace}
            onMoveMap={onMoveMap}
            apiKey={apiKey}
          />
        )}

        {step === 2 && (
          <FillerStep
            handleNewStopAdded={onNewStopAdded}
            center={center}
            zoom={zoom}
            trip={trip}
            apiKey={apiKey}
          />
        )}

        {step === 3 && <ConfirmationStep trip={trip} />}

        {step === 4 && (
          <SubmittedStep trip={trip} id={session?.user?.id ?? ""} />
        )}

        <StepButton
          step={step}
          setStep={setStep}
          destination={destination}
          confirmDestination={confirmDestinationOnClick}
        />

        <TextField
          placeholder="Enter Maps API Key"
          variant="outlined"
          value={apiKey}
          onChange={onBlurApiKey}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
          }}
        />
      </Layout>
    </>
  );
};

export default CreateTrip;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};
