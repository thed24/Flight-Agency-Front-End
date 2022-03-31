import { useCallback, useEffect, useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import {
  StopModal,
  Layout,
  DestinationStep,
  StopStep,
  FillerStep,
  ConfirmationStep,
  SubmittedStep,
  StepButton,
  Title,
  SubTitle,
  Container,
} from "components";
import {
  DateRange,
  Location,
  LoadCountries,
  Place,
  Places,
  PlacesRequest,
  Trip,
} from "types";
import { RequestLocationDataEndpoint, CreateTripEndpoint } from "utilities";
import { NextPage } from "next";
import { IsError, useGet, usePost } from "hooks";

const CreateTrip: NextPage = () => {
  const countries = LoadCountries();

  const [modalPlace, setModalPlace] = useState<Place | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
  });

  const [category, setCategory] = useState<string>("Food");
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

  const {
    loading: placesLoading,
    payload: placesResult,
    request: placesRequest,
  } = useGet<Places>(RequestLocationDataEndpoint);

  const { loading: createTripLoading, request: createTripRequest } = usePost<
    Trip,
    void
  >(CreateTripEndpoint);

  useEffect(() => {
    var request: PlacesRequest = {
      lat: center.lat,
      lng: center.lng,
      zoom: zoom,
      radius: 2000,
      keyword: `'${category}'`,
    };

    placesRequest(request);
  }, [category]);

  useEffect(() => {
    if (!IsError(placesResult)) setPlaces(placesResult.data.results);
  }, [placesResult]);

  useEffect((): void => {
    if (step === 4) {
      createTripRequest(trip);
    }
  }, [step]);

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

  function OpenModalWithPlace(place: Place): void {
    setModalOpen(true);
    setModalValue({
      start: new Date(),
      end: new Date(),
    });
    setModalPlace(place);
  }

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

      <Layout loading={placesLoading || createTripLoading}>
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
            onClickMarker={OpenModalWithPlace}
            onChangeCategory={setCategory}
            category={category}
          />
        )}

        {step === 2 && <FillerStep center={center} zoom={zoom} trip={trip} />}

        {step === 3 && <ConfirmationStep trip={trip} />}

        {step === 4 && <SubmittedStep />}

        <StepButton
          step={step}
          setStep={setStep}
          destination={destination}
          confirmDestination={confirmDestinationOnClick}
        />
      </Layout>
    </>
  );
};

export default CreateTrip;
