export async function getFileFromURL(url, name) {
    const res = await fetch(url);
    const blob = await res.blob();
    const mime = blob.type;
    const extension = mime.slice(mime.lastIndexOf('/') + 1, mime.length);
    const file = new File([blob], name || `file.${extension}`, {
        type: mime
    });

    file.extension = extension;

    return file;
}