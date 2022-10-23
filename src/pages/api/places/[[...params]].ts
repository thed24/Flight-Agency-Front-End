import axios from 'axios';
import { readApiKey, RequiresAuth } from 'common/server';
import { Cache } from 'common/server/cache';
import { Address, Place } from 'common/types';
import {
    BadRequestException,
    createHandler,
    Get,
    Query,
} from 'next-api-decorators';

const client = axios.create();

type IntermediatePlacesResponse = {
    results: Place[];
    status: string;
};

type IntermediateReverseGeocodeResponse = {
    results: Address[];
    status: string;
};

class placesHandler {
    @Get('/nearBy')
    async nearBy(
        @Query('lat') lat: string,
        @Query('lng') lng: string,
        @Query('radius') radius: string,
        @Query('zoom') zoom: string,
        @Query('keyword') keyword: string
    ) {
        if (!lat || !lng || !zoom || !radius || !keyword) {
            throw new BadRequestException();
        }

        const cachedPlaces = Cache.get<Place[]>(
            `${lat}-${lng}-${radius}-${keyword}`
        );

        if (cachedPlaces) {
            return cachedPlaces;
        }

        const key = await readApiKey();

        return client
            .post<IntermediatePlacesResponse>(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${keyword}&key=${key}`
            )
            .then((result) => {
                Cache.set(
                    `${lat}-${lng}-${radius}-${keyword}`,
                    result.data.results
                );
                return result.data.results;
            })
            .catch((error) => {
                throw new BadRequestException(error.response.data);
            });
    }

    @Get('/reverseGeocode')
    @RequiresAuth()
    async reverseGeocode(@Query('lat') lat: string, @Query('lng') lng: string) {
        if (!lat || !lng) {
            throw new BadRequestException();
        }

        const cachedAddress = Cache.get(`${lat}-${lng}`);

        if (cachedAddress) {
            return cachedAddress;
        }

        const key = await readApiKey();

        return client
            .post<IntermediateReverseGeocodeResponse>(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
            )
            .then((result) => {
                Cache.set(`${lat}-${lng}`, result.data);
                return result.data;
            })
            .catch((error) => {
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(placesHandler);
