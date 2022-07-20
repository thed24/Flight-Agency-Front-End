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
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
        initOnMount: false,
    });

    const handleInput = useCallback(
        (e: SyntheticEvent<Element, Event> | null, val: string) => {
            if (e === null) return;

            setValue(val);
        },
        [setValue]
    );

    const handleSelect = useCallback(
        (e: SyntheticEvent<Element, Event> | null, val: string | null) => {
            if (e === null || val === null) {
                setValue('');
                return;
            }

            setValue(val, false);
            clearSuggestions();

            getGeocode({ address: val }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setCenter(lat, lng);
            });
        },
        [setCenter, clearSuggestions, setValue]
    );

    useEffect(() => {
        if (value === defaultAddress && data && data.length > 0) {
            handleSelect(null, data[0].description);
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
            loading={!apiLoaded}
            loadingText="Searching for places..."
            sx={{ width: '500px' }}
            options={data.map((option) => option.description)}
            onInputChange={handleInput}
            onChange={handleSelect}
            value={value}
            renderInput={(params) => (
                <TextField {...params} label="Search for a place!" />
            )}
        />
    );
};

AutoCompleteInternal.displayName = 'AutoComplete';
export const AutoComplete = React.memo(AutoCompleteInternal);
