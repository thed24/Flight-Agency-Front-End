import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { SyntheticEvent } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

interface Props {
    apiLoaded: boolean;
    setCenter: (lat: number, lng: number) => void;
}

const AutoCompleteInternal = ({ setCenter, apiLoaded }: Props) => {
    const {
        init,
        ready,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
        initOnMount: false,
    });

    const handleInput = (e: SyntheticEvent<Element, Event>, val: string) => {
        setValue(val);
    };

    const handleSelect = (
        e: SyntheticEvent,
        val: google.maps.places.AutocompletePrediction | null
    ) => {
        if (val === null) return;

        setValue(val.description, false);
        clearSuggestions();

        getGeocode({ address: val.description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            setCenter(lat, lng);
        });
    };

    if (!apiLoaded && !ready) return <CircularProgress />;
    if (apiLoaded && !ready) {
        init();
    }

    return (
        <div>
            {ready && (
                <Autocomplete
                    getOptionLabel={(option) =>
                        option.structured_formatting.main_text
                    }
                    sx={{ width: '500px' }}
                    options={data}
                    onInputChange={handleInput}
                    onChange={handleSelect}
                    renderInput={(params) => (
                        <TextField {...params} label="Search for a place!" />
                    )}
                />
            )}
        </div>
    );
};

AutoCompleteInternal.displayName = 'AutoComplete';
export const AutoComplete = AutoCompleteInternal;
