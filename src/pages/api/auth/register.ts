import { RegisterRequest, User } from 'common/types';
import { RequestRegisterEndpoint } from 'common/utilities';
import {
    createHandler,
    Post,
    BadRequestException,
    Body,
} from '@storyofams/next-api-decorators';
import { client } from 'common/server';
import { AxiosError } from 'axios';

type RegisterResponse = User;

class registerHandler {
    @Post()
    async login(@Body() request: RegisterRequest) {
        if (!request) throw new BadRequestException();

        await client
            .post<RegisterResponse>(RequestRegisterEndpoint, request)
            .then((response) => {
                return response.data;
            })
            .catch((error: AxiosError) => {
                throw new BadRequestException(error.response?.data);
            });
    }
}

export default createHandler(registerHandler);
