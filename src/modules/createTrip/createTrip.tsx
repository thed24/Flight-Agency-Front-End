import { Layout, SC } from 'common/components';
import { DateRange, Place } from 'common/types';
import {
    StepButton,
    StopModal,
    TripStepper,
} from 'modules/createTrip/components';
import { useTrip, useTripFlow } from 'modules/createTrip/context';
import {
    ConfirmationStep,
    DestinationStep,
    FillerStep,
    StopStep,
} from 'modules/createTrip/steps';
import { useState } from 'react';

type ModalState = {
    value: DateRange;
    day: number;
    place: Place;
};

const CreateTrip = () => {
    const { step } = useTripFlow();
    const { trip } = useTrip();

    const [modalState, setModalState] = useState<ModalState | null>(null);

    const closeModal = () => {
        setModalState(null);
    };

    const openModal = (place: Place, day: number) => {
        const latestStop = trip.stops[trip.stops.length - 1];
        const startDate = new Date(
            (latestStop?.time?.end ?? new Date()).getTime() + 1 * 60 * 60 * 1000
        );

        startDate.setHours(
            startDate.getHours() + Math.round(startDate.getMinutes() / 60)
        );
        startDate.setMinutes(0, 0, 0);

        const endDate = new Date(startDate.getTime() + 1 * 60 * 60 * 1000);

        setModalState({
            value: {
                start: startDate,
                end: endDate,
            },
            day,
            place,
        });
    };

    return (
        <>
            {modalState && (
                <StopModal
                    place={modalState.place}
                    value={modalState.value}
                    day={modalState.day}
                    close={closeModal}
                />
            )}

            <Layout title="Build Your Trip | Flight Agency">
                <SC.Title> Welcome to the Flight Agency </SC.Title>
                <SC.SubTitle> Build your trip below </SC.SubTitle>

                <SC.Container>
                    <TripStepper step={step} />
                </SC.Container>

                {step === 0 && <DestinationStep />}

                {step === 1 && <StopStep onClickMarker={openModal} />}

                {step === 2 && <FillerStep />}

                {step === 3 && <ConfirmationStep />}

                <StepButton />
            </Layout>
        </>
    );
};

export default CreateTrip;
