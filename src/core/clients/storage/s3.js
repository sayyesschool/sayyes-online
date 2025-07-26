import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default ({
    S3_ACCESS_KEY_ID: accessKeyId,
    S3_SECRET_ACCESS_KEY: secretAccessKey,
    S3_STORAGE_ENDPOINT: endpoint,
    S3_STORAGE_REGION: region,
    S3_STORAGE_BUCKET: bucket
}) => {
    const client = new S3Client({
        endpoint,
        region,
        credentials: {
            accessKeyId,
            secretAccessKey
        }
    });

    return {
        put(key, body) {
            return client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: body
            })).then(() => {
                return {
                    url: `${endpoint}/${bucket}/${key}`,
                    path: key
                };
            });
        },

        delete(key) {
            return client.send(new DeleteObjectCommand({
                Bucket: bucket,
                Key: key
            })).then(() => {
                return {
                    url: `${endpoint}/${bucket}/${key}`,
                    path: key
                };
            });
        }
    };
};