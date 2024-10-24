import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default class Storage {
    constructor({ accessKeyId, secretAccessKey, endpoint, region, bucket }) {
        this.endpoint = endpoint;
        this.bucket = bucket;

        this.storage = new S3Client({
            endpoint,
            region,
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });
    }

    put(key, body) {
        return this.storage.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body
        })).then(() => {
            return {
                url: `${this.endpoint}/${this.bucket}/${key}`,
                path: key
            };
        }).catch(error => {
            error.message = `There was an error uploading your file: ${error.message}`;
            throw error;
        });
    }

    delete(key) {
        return this.storage.send(new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        })).then(() => {
            return {
                url: `${this.endpoint}/${this.bucket}/${key}`,
                path: key
            };
        }).catch(error => {
            error.message = `There was an error deleting your file: ${error.message}`;
            throw error;
        });
    }
}