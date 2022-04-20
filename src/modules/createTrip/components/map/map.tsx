import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo, useMemo, useRef } from 'react';

const mapContainerStyle = {
    height: '600px',
    width: '800px',
};
interface Props {
    center: { lat: number; lng: number };
    zoom: number;
    children: any;
    apiKey: string;
    key: string;
    onDrag: (lat: number, lng: number) => void;
    onZoom: (zoom: number) => void;
    onClick?: (any: any) => void;
    onLoad?: (any: any) => void;
}

const MapInternal = ({
    center,
    zoom,
    children,
    apiKey,
    key,
    onClick,
    onDrag,
    onZoom,
    onLoad,
}: Props) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    });

    const mapRef = useRef<google.maps.Map | null>(null);

    const centerOptions = useMemo(() => {
        return {
            lat: center.lat,
            lng: center.lng,
        };
    }, [center]);

    const zoomOptions = useMemo(() => zoom, [zoom]);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps...</div>;
    }

    const handleOnLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        onLoad && onLoad(map);
    };

    const handleOnIdle = () => {
        if (mapRef && mapRef !== null && mapRef.current !== null) {
            const currCenter = {
                lat: mapRef.current.getCenter()?.lat(),
                lng: mapRef.current.getCenter()?.lng(),
            };

            const currZoom = mapRef.current?.getZoom();

            if (
                currCenter.lat &&
                currCenter.lng &&
                (currCenter.lat !== centerOptions.lat ||
                    currCenter.lng !== centerOptions.lng)
            ) {
                console.log('center', currCenter, centerOptions);
                onDrag && onDrag(currCenter.lat, currCenter.lng);
            }

            if (currZoom && currZoom !== zoomOptions) {
                console.log('zoom', currZoom, zoomOptions);
                onZoom && onZoom(currZoom);
            }
        }
    };

    return (
        // @ts-ignore
        <GoogleMap
            key={key}
            mapContainerStyle={mapContainerStyle}
            center={centerOptions}
            zoom={zoomOptions}
            onClick={onClick}
            onLoad={handleOnLoad}
            onIdle={handleOnIdle}
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
    );
};

export const Map = memo(MapInternal);
