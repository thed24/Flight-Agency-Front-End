import axios from 'axios';

export { Cache } from './cache';
export { RequiresAuth } from './decorators';
export { readApiKey } from './secrets';

export const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:8080',
});
