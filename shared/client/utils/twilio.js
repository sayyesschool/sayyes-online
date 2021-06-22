function getToken(url, identity) {
    const response = await fetch(`${url}?identity=${encodeURIComponent(identity)}`);
    if (!response.ok) {
        throw new Error('Unable to fetch Access Token');
    }
    return response.text();
}