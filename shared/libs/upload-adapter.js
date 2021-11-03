export class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
        this.xhr = null;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                this._initRequest();
                this._initListeners(resolve, reject, file);
                this._sendRequest(file);
            }));
    }

    abort() {
        this.xhr?.abort();
    }

    _initRequest() {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/storage/put', true);
        xhr.responseType = 'json';

        this.xhr = xhr;
    }

    _initListeners(resolve, reject, file) {
        const { loader, xhr } = this;
        const genericErrorText = `Не удалось загрузить файл: ${file.name}.`;

        xhr.addEventListener('error', () => reject(genericErrorText));
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            if (!response?.ok) {
                return reject(response?.message || genericErrorText);
            }

            resolve({
                default: response.data.url
            });
        });

        if (xhr.upload) {
            xhr.upload.addEventListener('progress', evt => {
                if (evt.lengthComputable) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            });
        }
    }

    _sendRequest(file) {
        const data = new FormData();

        data.append('file', file);

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        this.xhr.send(data);
    }
}

export function UploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new UploadAdapter(loader);
    };
}