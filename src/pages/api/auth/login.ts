import { LoginRequest, User } from 'common/types';
import { RequestLoginEndpoint } from 'common/utilities';
import {
    createHandler,
    Post,
    BadRequestException,
    Body,
} from '@storyofams/next-api-decorators';
import { client } from 'common/server';

type LoginResponse = User;

class loginHandler {
    @Post()
    async login(@Body() request: LoginRequest) {
        if (!request) throw new BadRequestException();

        client
            .post<LoginResponse>(RequestLoginEndpoint, request)
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(loginHandler);
