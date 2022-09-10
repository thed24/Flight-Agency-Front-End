import { Typography } from '@mui/material';
import { InfoBox } from '@react-google-maps/api';
import { Place } from 'common/types';
import React, { MouseEventHandler } from 'react';

import { MarkerBottom, MarkerContainer, MarkerTop } from './marker.style';

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
            <MarkerTop>
                <Typography sx={{ fontWeight: 'bold' }} color="primary">
                    {name}
                </Typography>
            </MarkerTop>

            <MarkerBottom>
                {place && (
                    <>
                        <Typography color="white">{place.vicinity}</Typography>
                        <Typography color="white">{`${place.rating} / 5 stars`}</Typography>
                    </>
                )}
            </MarkerBottom>
        </MarkerContainer>
    </InfoBox>
);
