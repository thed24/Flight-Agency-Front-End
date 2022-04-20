import { useCallback, useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import { Layout, SC } from 'common/components';
import { DateRange, Location, Place, Trip, Stop } from 'common/types';
import { NextPage } from 'next';
import { StopModal, StepButton } from 'modules/createTrip/components';
import { useSession } from 'next-auth/react';
import { TextField } from '@mui/material';
import {
    DestinationStep,
    StopStep,
    FillerStep,
    ConfirmationStep,
    SubmittedStep,
} from 'modules/createTrip/steps';

const CreateTrip: NextPage = () => {
    const { data: session } = useSession();

    const [modalPlace, setModalPlace] = useState<Place | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState<DateRange>({
        start: new Date(),
        end: new Date(),
    });

    const [step, setStep] = useState<number>(0);
    const [destination, setDestination] = useState<string>('');
    const [trip, setTrip] = useState<Trip>({
        id: 0,
        stops: [],
        destination: '',
    });

    const [center, setCenter] = useState<Location>({
        lat: -37.840935,
        lng: 144.946457,
    });

    const [apiKey, setApiKey] = useState<string>('');

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
        setModalPlace(null);
    }, [modalOpen]);

    const openModalWithPlace = (place: Place, day: number) => {
        var startDate = new Date();
        startDate.setDate(startDate.getDate());
        startDate.setHours(6, 0, 0, 0);

        var endDate = new Date();
        endDate.setDate(endDate.getDate());
        endDate.setHours(7, 0, 0, 0);

        setModalValue({
            start: startDate,
            end: endDate,
        });
        setModalPlace(place);
        setModalOpen(true);
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

            <Layout title={'Build Your Trip | Flight Agency'}>
                <SC.Title> Welcome to the Flight Agency </SC.Title>
                <SC.SubTitle> Build your trip below </SC.SubTitle>

                <SC.Container>
                    <Stepper activeStep={step}>
                        <Step label="Select your destination" />
                        <Step label="Select your stops" />
                        <Step label="Connect your stops" />
                        <Step label="Confirm your trip" />
                        <Step label="Trip confirmed" />
                    </Stepper>
                </SC.Container>

                {step === 0 && (
                    <DestinationStep
                        destination={destination}
                        onChange={setDestination}
                    />
                )}

                {step === 1 && (
                    <StopStep
                        center={center}
                        trip={trip}
                        destination={destination}
                        onClickMarker={openModalWithPlace}
                        onMoveMap={onMoveMap}
                        apiKey={apiKey}
                    />
                )}

                {step === 2 && (
                    <FillerStep
                        handleNewStopAdded={onNewStopAdded}
                        center={center}
                        trip={trip}
                        apiKey={apiKey}
                        onMoveMap={onMoveMap}
                    />
                )}

                {step === 3 && <ConfirmationStep trip={trip} />}

                {step === 4 && (
                    <SubmittedStep trip={trip} id={session?.user?.id ?? ''} />
                )}

                <StepButton
                    step={step}
                    setStep={setStep}
                    destination={destination}
                    trip={trip}
                />

                <TextField
                    placeholder="Enter Maps API Key"
                    variant="outlined"
                    value={apiKey}
                    onChange={onBlurApiKey}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '25px',
                        marginBottom: '25px',
                    }}
                />
            </Layout>
        </>
    );
};

export default CreateTrip;
