const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

class Storage {
    constructor({ endpoint, region, bucket }) {
        this.endpoint = endpoint;
        this.bucket = bucket;
        this.storage = new S3Client({
            endpoint,
            region,
            credentials: {
                accessKeyId: process.env.YANDEX_CLOUD_ACCESS_KEY_ID,
                secretAccessKey: process.env.YANDEX_CLOUD_SECRET_ACCESS_KEY,
            },
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
            console.error('There was an error uploading your file: ', error.message);
            return error;
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
            console.error('There was an error deleting your file: ', error.message);
            return error;
        });
    }
}

module.exports = Storage;