import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { SC } from 'common/components';
import { LoadCountries } from 'common/types';
import { useTrip } from 'modules/createTrip/context';
import { useCallback } from 'react';

export const DestinationStep = () => {
    const { trip, setDestination } = useTrip();

    const handleOnChange = useCallback(
        (event: SelectChangeEvent<string>) => {
            setDestination(event.target.value);
        },
        [setDestination]
    );

    return (
        <SC.Container>
            <Typography variant="h5">Please select your destination</Typography>
            <FormControl style={{ width: '20rem', margin: '30px' }}>
                <InputLabel>Select a country</InputLabel>
                <Select
                    label="Select a country"
                    value={trip.destination}
                    sx={{ backgroundColor: 'primary' }}
                    onChange={handleOnChange}
                >
                    {LoadCountries().map((c) => (
                        <MenuItem value={c.name} key={c.name}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </SC.Container>
    );
};
