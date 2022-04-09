import { useCallback, useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import {
  StopModal,
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
} from "modules/createTrip";
import { getSession, useSession } from "next-auth/react";
import { TextField } from "@mui/material";
import { Session } from "next-auth";

const CreateTrip: NextPage = () => {
  const { data: session } = useSession();

  const countries = LoadCountries();

  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });

  const [category, setCategory] = useState<string>("");
  const [step, setStep] = useState<number>(0);
  const [destination, setDestination] = useState<string>("");
  const [trip, setTrip] = useState<Trip>({
    id: 0,
    stops: [],
    destination: "",
  });

  const [zoom, setZoom] = useState<number>(15);
  const [places, setPlaces] = useState<Place[]>([]);
  const [center, setCenter] = useState<Location>({
    lat: -37.840935,
    lng: 144.946457,
  });

  const [apiKey, setApiKey] = useState<string>("");

  const {
    loading: placesLoading,
    payload: placesResult,
    request: placesRequest,
  } = useGet<Places>(RequestLocationDataEndpoint);

  const {
    loading: addressLoading,
    payload: addressResult,
    request: addressRequest,
  } = useGet<Addresses>(RequestAddressEndpoint);

  const { loading: createTripLoading, request: createTripRequest } = usePost<
    Trip,
    void
  >(CreateTripEndpoint(session?.user?.id ?? ""));

  useEffect(() => {
    if (step === 1) setCategory("Food");
  }, [step]);

  useEffect((): void => {
    if (step === 4) {
      createTripRequest(trip);
    }
  }, [step]);

  useEffect(() => {
    var request: PlacesRequest = {
      lat: center.lat,
      lng: center.lng,
      zoom: zoom,
      radius: 2000,
      keyword: `'${category}'`,
    };

    placesRequest(request);
  }, [category, center]);

  useEffect(() => {
    if (!IsError(placesResult)) setPlaces(placesResult.data.results);
  }, [placesResult]);

  useEffect(() => {
    if (!IsError(addressResult)) {
      const address = addressResult.data.results[0];

      const newStop: Stop = {
        name: `Stop Over at ${address.formattedAddress}`,
        time: { start: new Date(), end: new Date() },
        location: {
          lat: address.geometry.location.latitude,
          lng: address.geometry.location.longitude,
        },
        address: address.formattedAddress,
      };

      setTrip((prevState) => ({
        ...prevState,
        stops: [...prevState.stops, newStop],
      }));
    }
  }, [addressResult]);

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

  const onAddStopOver = (lat: number, lng: number) => {
    var request: AddressRequest = {
      lat: lat,
      lng: lng,
    };

    addressRequest(request);
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

      <Layout loading={placesLoading || createTripLoading || addressLoading}>
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
            places={places}
            trip={trip}
            onClickMarker={openModalWithPlace}
            onChangeCategory={setCategory}
            category={category}
            onMoveMap={onMoveMap}
            apiKey={apiKey}
          />
        )}

        {step === 2 && (
          <FillerStep
            addStopOver={onAddStopOver}
            center={center}
            zoom={zoom}
            trip={trip}
            apiKey={apiKey}
          />
        )}

        {step === 3 && <ConfirmationStep trip={trip} />}

        {step === 4 && <SubmittedStep />}

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
