import { Trip, User } from 'common/types';
import { CreateTripEndpoint, GetTripsEndpoint } from 'common/utilities';
import {
    Post,
    Body,
    Get,
    BadRequestException,
    createHandler,
    Param,
} from '@storyofams/next-api-decorators';
import { client, RequiresAuth } from 'common/server';

type GetTripResponse = Trip[];
type CreateTripResonse = User;

class userHandler {
    @Get('/:id/trips')
    @RequiresAuth()
    async getTrips(@Param('id') id: string) {
        client
            .get<GetTripResponse>(GetTripsEndpoint(id))
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                throw new BadRequestException(error);
            });
    }

    @Post('/:id/trips')
    @RequiresAuth()
    async createTrip(@Param('id') id: string, @Body() request: Trip) {
        client
            .post<CreateTripResonse>(CreateTripEndpoint(id), request)
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(userHandler);
