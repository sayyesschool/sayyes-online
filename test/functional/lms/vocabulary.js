import expect from 'expect';

export default (api, { models: { Lexeme, Vocabulary }, user }) =>
    describe('Vocabulary routes', () => {
        describe('Vocabularies', () => {
            describe('GET /', () => {
                it('should get a vocabulary', async () => {
                    await Vocabulary.create([
                        { learnerId: user.id },
                        { learnerId: user.id },
                        { }
                    ]);

                    const { body } = await api.get('/vocabularies');

                    expect(body.data.length).toBe(2);
                });
            });

            describe('POST /', () => {
                it('should create a new vocabulary', async () => {
                    const { body } = await api.post('/vocabularies').send({});

                    expect(body.data).toMatch({
                        id: /^\S+$/,
                        type: 'default',
                        learnerId: /^\S+$/,
                        lexemeIds: []
                    });
                });
            });
        });

        describe('Vocabulary', () => {
            describe('GET /:id', () => {
                it('should get a vocabulary', async () => {
                    const vocabulary = await Vocabulary.create({});

                    const { body } = await api.get(`/vocabularies/${vocabulary.id}`);

                    expect(body.data).toMatch({ id: vocabulary.id });
                });
            });

            describe('PUT /:id', () => {
                it('should update a vocabulary', async () => {
                    const vocabulary = await Vocabulary.create({ title: '', description: '' });

                    const data = {
                        title: 'Title',
                        description: 'Description'
                    };

                    const { body } = await api.put(`/vocabularies/${vocabulary.id}`).send(data);

                    expect(body.data).toMatch({
                        id: vocabulary.id,
                        ...data
                    });
                });
            });

            describe('DELETE /:id', () => {
                it('should delete a vocabulary', async () => {
                    const vocabulary = await Vocabulary.create({});

                    const { body } = await api.delete(`/vocabularies/${vocabulary.id}`);

                    expect(body.data).toMatch({
                        id: vocabulary.id
                    });
                });
            });
        });

        describe('Vocabulary lexemes', () => {
            describe('POST /:vocabularyId/lexemes', () => {
                it('should add a lexeme to the vocabulary', async () => {
                    const vocabulary = await Vocabulary.create({});

                    const data = {
                        value: 'cat',
                        definition: 'a furry animal'
                    };

                    const { body } = await api.post(`/vocabularies/${vocabulary.id}/lexemes`).send(data);

                    expect(body.data).toMatch(data);
                    expect(body.data.status).toBe(0, 'The lexeme doesn\'t have a `status` field');
                    expect(body.data.reviewDate).toExist('The lexeme doesn\'t have a `reviewDate` field');
                });
            });

            describe('PUT /:vocabularyId/lexemes/:lexemeId', () => {
                it('should update the lexeme if it was created by the learner', async () => {
                    const lexeme = await Lexeme.create({
                        value: 'cat',
                        definition: 'a furry animal',
                        createdBy: user.id
                    });
                    const vocabulary = await Vocabulary.create({
                        lexemeIds: [lexeme.id],
                        learnerId: user.id
                    });

                    const data = {
                        definition: 'a furry animal with four legs and a tail'
                    };

                    const { body } = await api.put(`/vocabularies/${vocabulary.id}/lexemes/${lexeme.id}`).send(data);

                    expect(body.data).toMatch(data);
                });
            });

            describe('DELETE /:vocabularyId/lexemes/:lexemeId', () => {
                it('should delete the lexeme if it was created by the learner', async () => {
                    const lexeme = await Lexeme.create({
                        value: 'cat',
                        definition: 'a furry animal',
                        createdBy: user.id
                    });
                    const vocabulary = await Vocabulary.create({
                        lexemeIds: [lexeme.id],
                        learnerId: user.id
                    });

                    const { body } = await api.delete(`/vocabularies/${vocabulary.id}/lexemes/${lexeme.id}`);

                    expect(body.data).toMatch({
                        id: lexeme.id,
                        vocabularyId: vocabulary.id
                    });
                });
            });
        });
    });