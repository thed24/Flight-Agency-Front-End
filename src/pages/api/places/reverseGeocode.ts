import {
    BadRequestException,
    createHandler,
    Get,
    Query,
} from '@storyofams/next-api-decorators';
import axios from 'axios';
import { readApiKey, RequiresAuth } from 'common/server';
import { Cache } from 'common/server/cache';
import { logger } from 'common/server/logging';
import { Address } from 'common/types';

const client = axios.create();

type IntermediateReverseGeocodeResponse = {
    results: Address[];
    status: string;
};
class reverseGeocodeHandler {
    @Get()
    @RequiresAuth()
    async login(@Query('lat') lat: string, @Query('lng') lng: string) {
        if (!lat || !lng) {
            logger.error('Missing required query parameters.');
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
                logger.error(`Failed to call API: ${error}`);
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(reverseGeocodeHandler);
