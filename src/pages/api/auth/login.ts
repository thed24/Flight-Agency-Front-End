import {
    BadRequestException,
    Body,
    createHandler,
    Post,
} from '@storyofams/next-api-decorators';
import { client } from 'common/server';
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
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(loginHandler);
