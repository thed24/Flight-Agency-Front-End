/* eslint-disable camelcase */
import {
    createMiddlewareDecorator,
    NextFunction,
    UnauthorizedException,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export const RequiresAuth = createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session) {
            throw new UnauthorizedException();
        }

        next();
    }
);
