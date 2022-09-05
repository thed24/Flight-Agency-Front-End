import DateFnsUtils from '@date-io/date-fns';
import { Modal, TextField, TextFieldProps } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Button, SubTitle, Title } from 'common/components';
import { DateRange, Place } from 'common/types';
import { useTrip } from 'modules/createTrip/context';
import React, { useCallback, useState } from 'react';

import { ModalContainer } from './stopModal.styles';

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
            const newEndDate =
                endDate.getHours() > newStartDate.getHours()
                    ? endDate
                    : new Date(newStartDate.getTime() + 1 * 60 * 60 * 1000);

            setStartDate(newStartDate);
            setEndDate(newEndDate);
        },
        [endDate]
    );

    const handleChangeEnd = useCallback(
        (event: string | null) => {
            if (!event || Number.isNaN(event?.valueOf()) || !startDate) {
                return;
            }

            const newEndDate = new Date(event);
            const newStartDate =
                startDate.getHours() < newEndDate.getHours()
                    ? startDate
                    : new Date(newEndDate.getTime() - 1 * 60 * 60 * 1000);

            setStartDate(newStartDate);
            setEndDate(newEndDate);
        },
        [startDate]
    );

    return (
        place && (
            <Modal open>
                <ModalContainer>
                    <Title> {place.name} </Title>
                    <SubTitle> {place.vicinity} </SubTitle>
                    <SubTitle> Rated {place.rating} / 5</SubTitle>

                    <SubTitle> Select a Time </SubTitle>

                    <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <DateTimePicker
                            label="Start Time"
                            value={startDate}
                            onChange={handleChangeStart}
                            renderInput={(
                                params: JSX.IntrinsicAttributes & TextFieldProps
                            ) => <TextField {...params} />}
                            minDate={new Date().toISOString()}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <DateTimePicker
                            label="Stop Time"
                            value={endDate}
                            onChange={handleChangeEnd}
                            renderInput={(
                                params: JSX.IntrinsicAttributes & TextFieldProps
                            ) => <TextField {...params} />}
                            minDate={new Date().toISOString()}
                        />
                    </LocalizationProvider>

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
