import { Card, CardContent, Typography } from '@mui/material';
import React, { MouseEventHandler } from 'react';
import { Place } from 'common/types';
import { InfoBox } from '@react-google-maps/api';

export type LayoutProps = {
    lat: number;
    lng: number;
    place: Place;
    onClick: MouseEventHandler;
};

export function Marker({ lat, lng, place, onClick }: LayoutProps) {
    const text = place.name;
    const address = place.vicinity;
    const rating = place.rating;

    return (
        // @ts-ignore
        <InfoBox position={{ lat, lng }}>
            <Card onClick={onClick}>
                <CardContent>
                    <Typography color={'secondary'}> {text} </Typography>
                    <Typography color={'secondary'}> {address} </Typography>
                    <Typography color={'secondary'}> {rating} </Typography>
                </CardContent>
            </Card>
        </InfoBox>
    );
}
