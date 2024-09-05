export function getExtensionFromUrl(url) {
    return url.slice(url.lastIndexOf('.') + 1, url.length);
}

export function getExtensionFromType(type) {
    return type.slice(type.lastIndexOf('/') + 1, type.length);
}

export function getFileFromBlob(blob, { name = 'file' } = {}) {
    const type = blob.type;
    const extension = getExtensionFromType(type);
    const file = new File([blob], `${name}.${extension}`, {
        type
    });

    file.extension = extension;

    return file;
}

export async function getFileFromURL(url, options) {
    const res = await fetch(url);
    const blob = await res.blob();

    return getFileFromBlob(blob, options);
}