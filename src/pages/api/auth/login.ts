import {
    BadRequestException,
    Body,
    createHandler,
    Post,
} from '@storyofams/next-api-decorators';
import { client } from 'common/server';
import { logger } from 'common/server/logging';
import type { LoginRequest, User } from 'common/types';
import { RequestLoginEndpoint } from 'common/utilities';

type LoginResponse = User;

class loginHandler {
    @Post()
    login(@Body() request: LoginRequest) {
        if (!request) throw new BadRequestException();

        return client
            .post<LoginResponse>(RequestLoginEndpoint, request)
            .then((result) => result.data)
            .catch((error) => {
                logger.error(`Failed to call API: ${error.response?.data}`);
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(loginHandler);
