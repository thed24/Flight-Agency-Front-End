import { Modal } from '@mui/material';
import { Button, SubTitle, Title } from 'common/components';
import { DateRange, Place } from 'common/types';
import { useTrip } from 'modules/createTrip/context';
import React, { useCallback, useState } from 'react';

import { DateTimePicker, ModalContainer } from './stopModal.styles';

export interface Props {
    place: Place;
    day: number;
    value: DateRange;
    close: () => void;
}

const StopModalInternal = ({ place, day, value, close }: Props) => {
    const [startDate, setStartDate] = useState<Date | null>(value.start);
    const [endDate, setEndDate] = useState<Date | null>(value.end);
    const { trip, addStop } = useTrip();

    const handleConfirm = useCallback(() => {
        if (!startDate || !endDate) return;

        const newStop = {
            id: trip.stops.length,
            name: place.name,
            time: { start: startDate, end: endDate },
            address: place.vicinity,
            day,
            category: place.category ?? 'Food',
            location: {
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
            },
        };

        addStop(newStop);

        close();
    }, [addStop, close, startDate, endDate, day, place, trip.stops.length]);

    const handleChangeStart = useCallback(
        (event: string | null) => {
            if (!event || Number.isNaN(event?.valueOf()) || !endDate) {
                return;
            }

            const newStartDate = new Date(event);
            setStartDate(newStartDate);
        },
        [endDate]
    );

    const handleChangeEnd = useCallback(
        (event: string | null) => {
            if (!event || Number.isNaN(event?.valueOf()) || !startDate) {
                return;
            }

            const newEndDate = new Date(event);
            setEndDate(newEndDate);
        },
        [startDate]
    );

    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const startDateLocal = new Date(
        startDate?.getTime() ?? new Date().getTime() - timezoneOffset
    )
        .toISOString()
        .slice(0, -1);

    const endDateLocal = new Date(
        endDate?.getTime() ?? new Date().getTime() - timezoneOffset
    )
        .toISOString()
        .slice(0, -1);

    return (
        place && (
            <Modal open>
                <ModalContainer>
                    <Title> {place.name} </Title>
                    <SubTitle> {place.vicinity} </SubTitle>
                    <SubTitle> Rated {place.rating} / 5</SubTitle>

                    <SubTitle> Select a Time </SubTitle>

                    <DateTimePicker
                        type="datetime-local"
                        defaultValue={startDateLocal}
                        onChange={(e) => handleChangeStart(e.target.value)}
                    />

                    <DateTimePicker
                        type="datetime-local"
                        defaultValue={endDateLocal}
                        onChange={(e) => handleChangeEnd(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        disabled={!startDate || !endDate}
                        onClick={handleConfirm}
                    >
                        Save Stop
                    </Button>
                    <Button onClick={close}>Cancel</Button>
                </ModalContainer>
            </Modal>
        )
    );
};

StopModalInternal.displayName = 'StopModal';
export const StopModal = React.memo(StopModalInternal);
