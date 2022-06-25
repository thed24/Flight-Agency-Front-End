import { Autocomplete, TextField } from '@mui/material';
import React, { SyntheticEvent, useCallback, useEffect } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

interface Props {
    defaultAddress: string;
    apiLoaded: boolean;
    setCenter: (lat: number, lng: number) => void;
}

const AutoCompleteInternal = ({
    setCenter,
    apiLoaded,
    defaultAddress,
}: Props) => {
    const {
        init,
        ready,
        setValue,
        value,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
        initOnMount: false,
    });

    const [address, setAddress] =
        React.useState<google.maps.places.AutocompletePrediction | null>(null);

    const handleInput = useCallback(
        (e: SyntheticEvent<Element, Event> | null, val: string) => {
            setValue(val);
        },
        [setValue]
    );

    const handleSelect = useCallback(
        (
            e: SyntheticEvent<Element, Event> | null,
            val: google.maps.places.AutocompletePrediction | null
        ) => {
            if (val === null) return;

            setValue(val.description, false);
            setAddress(val);
            clearSuggestions();

            getGeocode({ address: val.description }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setCenter(lat, lng);
            });
        },
        [setCenter, clearSuggestions, setValue]
    );

    useEffect(() => {
        if (value === defaultAddress && data && data.length > 0) {
            handleSelect(null, data[0]);
        }
    }, [defaultAddress, data, setValue, value, handleSelect, handleInput]);

    if (apiLoaded && !ready) {
        init();
    }

    if (ready && value === '') {
        handleInput(null, defaultAddress);
    }

    return (
        <Autocomplete
            getOptionLabel={(option) =>
                `${option.structured_formatting.main_text}, ${option.structured_formatting.secondary_text}`
            }
            loading={!apiLoaded}
            loadingText="Searching for places..."
            sx={{ width: '500px' }}
            options={data}
            onInputChange={handleInput}
            onChange={handleSelect}
            value={address}
            renderInput={(params) => (
                <TextField {...params} label="Search for a place!" />
            )}
        />
    );
};

AutoCompleteInternal.displayName = 'AutoComplete';
export const AutoComplete = React.memo(AutoCompleteInternal);
