import DateFnsUtils from '@date-io/date-fns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Modal, TextField } from '@mui/material';
import { SC } from 'common/components';
import { DateRange, Place } from 'common/types';
import { useTrip } from 'modules/createTrip/context';
import { useCallback } from 'react';

import * as SSC from './stopModal.styles';

export interface Props {
    place: Place | null;
    value: DateRange;
    open: boolean;
    setOpen: (val: boolean) => void;
    setValue: (val: DateRange) => void;
    confirm: () => void;
    cancel: () => void;
}

export const StopModal = ({
    place,
    value,
    setValue,
    confirm,
    open,
    setOpen,
    cancel,
}: Props) => {
    const { trip, addStop } = useTrip();

    const handleConfirm = useCallback(() => {
        if (place) {
            const newStop = {
                id: trip.stops.length,
                name: place.name,
                time: value,
                address: place.vicinity,
                location: {
                    latitude: place.geometry.location.lat,
                    longitude: place.geometry.location.lng,
                },
            };

            addStop(newStop);
        }

        confirm();
    }, [addStop, confirm, place, trip.stops.length, value]);

    const handleChangeStart = useCallback(
        (event: string | null) => {
            setValue({
                start: event === null ? new Date() : new Date(event),
                end: value.end,
            });
        },
        [setValue, value.end]
    );

    const handleChangeEnd = useCallback(
        (event: string | null) => {
            setValue({
                start: value.start,
                end: event === null ? new Date() : new Date(event),
            });
        },
        [setValue, value.start]
    );

    return (
        place && (
            <Modal open={open} onClose={setOpen}>
                <SSC.ModalContainer>
                    <SC.Title> {place.name} </SC.Title>
                    <SC.SubTitle> {place.vicinity} </SC.SubTitle>
                    <SC.SubTitle> Rated {place.rating} / 5</SC.SubTitle>

                    <SC.SubTitle> Select a Time </SC.SubTitle>

                    <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <DateTimePicker
                            label="Start Time"
                            value={value.start}
                            onChange={handleChangeStart}
                            renderInput={(params) => <TextField {...params} />}
                            minDate={new Date().toISOString()}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={DateFnsUtils}>
                        <DateTimePicker
                            label="Stop Time"
                            value={value.end}
                            onChange={handleChangeEnd}
                            renderInput={(params) => <TextField {...params} />}
                            minDate={new Date().toISOString()}
                        />
                    </LocalizationProvider>

                    <Button onClick={handleConfirm}>Save Stop</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </SSC.ModalContainer>
            </Modal>
        )
    );
};
