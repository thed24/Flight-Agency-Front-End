import {
    BadRequestException,
    Body,
    createHandler,
    Get,
    Param,
    Post,
} from '@storyofams/next-api-decorators';
import { client, RequiresAuth } from 'common/server';
import { Trip, User } from 'common/types';
import { CreateTripEndpoint, GetTripsEndpoint } from 'common/utilities';

type GetTripResponse = Trip[];
type CreateTripResonse = User;

class userHandler {
    @Get('/:id/trips')
    @RequiresAuth()
    getTrips(@Param('id') id: string) {
        return client
            .get<GetTripResponse>(GetTripsEndpoint(id))
            .then((result) => result.data)
            .catch((error) => {
                throw new BadRequestException(error);
            });
    }

    @Post('/:id/trips')
    @RequiresAuth()
    createTrip(@Param('id') id: string, @Body() request: Trip) {
        const stopsWithoutIds = request.stops.map((stop) => ({
            ...stop,
            id: undefined,
        }));

        return client
            .post<CreateTripResonse>(CreateTripEndpoint(id), {
                ...request,
                id: null,
                stops: stopsWithoutIds,
            })
            .then((result) => result.data)
            .catch((error) => {
                throw new BadRequestException(error.response.data.message);
            });
    }
}

export default createHandler(userHandler);
