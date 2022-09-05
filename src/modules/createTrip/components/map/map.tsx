import { CircularProgress, ListItemText } from '@mui/material';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Place } from 'common/types';
import React, { memo, ReactNode, useMemo, useRef } from 'react';

import {
    OverlayButton,
    OverlayList,
    OverlayListItem,
    RelativeContainer,
} from './map.styles';

interface Props {
    center: { latitude: number; longitude: number };
    zoom: number;
    children: ReactNode[];
    places: Place[];
    apiKey: string;
    onClickPlace: (place: Place) => void;
    onDrag: (lat: number, lng: number) => void;
    onZoom: (zoom: number) => void;
    onClick?: (e: google.maps.MapMouseEvent) => void;
    setLoaded?: (loaded: boolean) => void;
}

const mapStyle = {
    height: '50vh',
    width: '80vh',
    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.4)',
    border: '3px solid #558dd6',
};

const libs: [
    'places' | 'drawing' | 'geometry' | 'localContext' | 'visualization'
] = ['places'];

const MapInternal = ({
    center,
    zoom,
    children,
    places,
    apiKey,
    onClickPlace,
    onDrag,
    onZoom,
    onClick,
    setLoaded,
}: Props) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: libs,
    });

    const [showOverlay, setShowOverlay] = React.useState(true);

    const mapRef = useRef<google.maps.Map | null>(null);

    const centerOptions = useMemo(
        () => ({
            lat: center.latitude,
            lng: center.longitude,
        }),
        [center]
    );

    const zoomOptions = useMemo(() => zoom, [zoom]);

    const handleOnLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        if (setLoaded) setLoaded(true);
    };

    const handleZoom = () => {
        if (mapRef && mapRef !== null && mapRef.current !== null) {
            const currZoom = mapRef.current?.getZoom();

            if (currZoom && currZoom !== zoomOptions) {
                onZoom(currZoom);
            }
        }
    };

    const handleDrag = () => {
        if (mapRef && mapRef !== null && mapRef.current !== null) {
            const currCenter = {
                lat: mapRef.current.getCenter()?.lat(),
                lng: mapRef.current.getCenter()?.lng(),
            };

            if (
                currCenter.lat &&
                currCenter.lng &&
                (currCenter.lat !== centerOptions.lat ||
                    currCenter.lng !== centerOptions.lng)
            ) {
                onDrag(currCenter.lat, currCenter.lng);
            }
        }
    };

    const onClickPlaceHandler = (place: Place) => () => {
        onClickPlace(place);
    };

    const toggleOverlay = () => {
        setShowOverlay(!showOverlay);
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <CircularProgress color="inherit" />;
    }

    return (
        <RelativeContainer>
            {places.length > 0 && (
                <OverlayButton onClick={toggleOverlay}>
                    {showOverlay ? 'Hide' : 'Show'} Locations
                </OverlayButton>
            )}

            {places.length > 0 && showOverlay && (
                <OverlayList>
                    {places.map((place) => (
                        <OverlayListItem
                            key={place.id}
                            onClick={onClickPlaceHandler(place)}
                        >
                            <ListItemText primary={place.name} />
                        </OverlayListItem>
                    ))}
                </OverlayList>
            )}

            <GoogleMap
                mapContainerStyle={mapStyle}
                center={centerOptions}
                zoom={zoomOptions}
                onLoad={handleOnLoad}
                onDragEnd={handleDrag}
                onZoomChanged={handleZoom}
                onClick={onClick}
                clickableIcons={false}
                options={{
                    disableDefaultUI: true,
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                }}
            >
                {children}
            </GoogleMap>
        </RelativeContainer>
    );
};

export default memo(MapInternal);
