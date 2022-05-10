import { TextField } from '@mui/material';
import { Layout, SC } from 'common/components';
import { DateRange, Place } from 'common/types';
import { StepButton, StopModal } from 'modules/createTrip/components';
import { useTripFlow } from 'modules/createTrip/context';
import {
    ConfirmationStep,
    DestinationStep,
    FillerStep,
    StopStep,
    SubmittedStep,
} from 'modules/createTrip/steps';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useCallback, useState } from 'react';
import { Step, Stepper } from 'react-form-stepper';

const CreateTrip: NextPage = () => {
    const { data: session } = useSession();

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
                    <Stepper activeStep={step}>
                        <Step label="Select your destination" />
                        <Step label="Select your stops" />
                        <Step label="Connect your stops" />
                        <Step label="Confirm your trip" />
                        <Step label="Trip confirmed" />
                    </Stepper>
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

                {step === 4 && <SubmittedStep id={session?.user?.id ?? ''} />}

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
