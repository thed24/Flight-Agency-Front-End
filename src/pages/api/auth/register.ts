import axios from 'axios';
import { RegisterRequest, User } from 'common/types';
import { RequestRegisterEndpoint } from 'common/utilities';
import {
    createHandler,
    Post,
    BadRequestException,
    Body,
} from '@storyofams/next-api-decorators';
import { client } from 'common/server';

type RegisterResponse = User;

class registerHandler {
    @Post()
    async login(@Body() request: RegisterRequest) {
        if (!request) throw new BadRequestException();

        client
            .post<RegisterResponse>(RequestRegisterEndpoint, request)
            .then((result) => {
                return result.data;
            })
            .catch((error) => {
                throw new BadRequestException(error.response.data);
            });
    }
}

export default createHandler(registerHandler);
