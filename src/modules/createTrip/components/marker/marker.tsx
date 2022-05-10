import { Typography } from '@mui/material';
import { InfoBox } from '@react-google-maps/api';
import { Place } from 'common/types';
import React, { MouseEventHandler } from 'react';

import { MarkerContainer } from './marker.style';

type LayoutProps = {
    lat: number;
    lng: number;
    name: string;
    onClick?: MouseEventHandler;
    place?: Place;
};

export const Marker = ({ lat, lng, place, name, onClick }: LayoutProps) => (
    <InfoBox position={new google.maps.LatLng(lat, lng)}>
        <MarkerContainer onClick={onClick}>
            <Typography sx={{ fontWeight: 'bold' }} color="primary">
                {name}
            </Typography>
            {place && (
                <>
                    <Typography color="primary"> {place.vicinity} </Typography>
                    <Typography color="primary">{`Rated ${place.rating} / 5`}</Typography>
                </>
            )}
        </MarkerContainer>
    </InfoBox>
);
