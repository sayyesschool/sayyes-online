export default ({ requestUrl }) => ({
    async addStudyRequest(data) {
        return await fetch(requestUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }
});