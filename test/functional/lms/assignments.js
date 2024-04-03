const expect = require('expect');

const { createId } = require('../../helpers');

module.exports = (api, { models: { Comment } }) =>
    describe('/comments', () => {
        xdescribe('POST /', () => {
            it('should create a comment', async () => {

            });
        });

        xdescribe('GET /:id', () => {
            it('should get a comment by id', async () => {

            });
        });

        xdescribe('PUT /:id', () => {
            it('should update a comment', async () => {

            });
        });

        xdescribe('DELETE /:id', () => {
            it('should delete an comment', async () => {

            });
        });
    });