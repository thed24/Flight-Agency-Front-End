import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient({
    projectId: 'thinking-case-340611',
});

export async function readApiKey(): Promise<string> {
    if (process.env.NODE_ENV !== 'production') {
        return process.env.NEXT_PUBLIC_API_KEY ?? '';
    }

    const [version] = await client.accessSecretVersion({
        name: 'google-api-key',
    });

    if (!version || !version.payload || !version.payload.data) {
        return '';
    }

    return version.payload.data.toString();
}
