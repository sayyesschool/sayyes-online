export function generatePassword() {
    const buf = new Uint8Array(6);
    crypto.getRandomValues(buf);
    return btoa(String.fromCharCode(...buf));
}