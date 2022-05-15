import { TextField } from '@mui/material';
import { Layout, SC } from 'common/components';
import { DateRange, Place } from 'common/types';
import {
    StepButton,
    StopModal,
    TripStepper,
} from 'modules/createTrip/components';
import { useTripFlow } from 'modules/createTrip/context';
import {
    ConfirmationStep,
    DestinationStep,
    FillerStep,
    StopStep,
} from 'modules/createTrip/steps';
import { NextPage } from 'next';
import { ChangeEvent, useCallback, useState } from 'react';

const CreateTrip: NextPage = () => {
    const { step } = useTripFlow();
    const [apiKey, setApiKey] = useState<string>('');

    const [modalPlace, setModalPlace] = useState<Place | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalValue, setModalValue] = useState<DateRange>({
        start: new Date(),
        end: new Date(),
    });

    const modalConfirm = useCallback(() => {
        setModalOpen(!modalOpen);
    }, [modalOpen]);

    const modalCancel = useCallback(() => {
        setModalOpen(!modalOpen);
        setModalPlace(null);
    }, [modalOpen]);

    const openModalWithPlace = (place: Place) => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate());
        startDate.setHours(6, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(endDate.getDate());
        endDate.setHours(7, 0, 0, 0);

        setModalValue({
            start: startDate,
            end: endDate,
        });

        setModalPlace(place);
        setModalOpen(true);
    };

    const onBlurApiKey = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
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

            <Layout title="Build Your Trip | Flight Agency">
                <SC.Title> Welcome to the Flight Agency </SC.Title>
                <SC.SubTitle> Build your trip below </SC.SubTitle>

                <SC.Container>
                    <TripStepper step={step} />
                </SC.Container>

                {step === 0 && <DestinationStep />}

                {step === 1 && (
                    <StopStep
                        onClickMarker={openModalWithPlace}
                        apiKey={apiKey}
                    />
                )}

                {step === 2 && <FillerStep apiKey={apiKey} />}

                {step === 3 && <ConfirmationStep />}

                <StepButton />

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
