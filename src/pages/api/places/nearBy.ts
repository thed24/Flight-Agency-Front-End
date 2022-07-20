import {
    BadRequestException,
    createHandler,
    Get,
    Query,
} from '@storyofams/next-api-decorators';
import axios from 'axios';
import { readApiKey } from 'common/server';
import { Cache } from 'common/server/cache';
import { logger } from 'common/server/logging';
import { Place } from 'common/types';

const client = axios.create();

type IntermediatePlacesResponse = {
    results: Place[];
    status: string;
};

class nearByHandler {
    @Get()
    async login(
        @Query('lat') lat: string,
        @Query('lng') lng: string,
        @Query('radius') radius: string,
        @Query('zoom') zoom: string,
        @Query('keyword') keyword: string
    ) {
        if (!lat || !lng || !zoom || !radius || !keyword) {
            logger.error('Missing required query parameters.');
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
                logger.error(`Failed to call API: ${error}`);
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(nearByHandler);
