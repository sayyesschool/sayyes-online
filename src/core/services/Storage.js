export default ({ clients: { storage } }) => ({
    put: storage.put,
    delete: storage.delete
});