import expect from 'expect';

import { createId } from '../../helpers';

export default (api, { models: { Lexeme, LexemeRecord, Vocabulary }, user }) =>
    describe('Vocabulary routes', () => {
        afterEach(async () => {
            await Lexeme.deleteMany({});
            await LexemeRecord.deleteMany({});
            await Vocabulary.deleteMany({});
        });

        describe('Vocabularies', () => {
            describe('GET /', () => {
                it('should get a list of vocabularies', async () => {
                    await Vocabulary.create([
                        { learnerId: user.id },
                        { learnerId: user.id }
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

        describe('My vocabulary', () => {
            describe('GET /my', () => {
                it('should get my vocabulary', async () => {
                    const { body } = await api.get('/vocabularies/my');

                    expect(body.data).toMatch({
                        title: 'Мой словарь',
                        learnerId: user.id
                    });
                });

                it('should get my vocabulary with lexemes', async () => {
                    const lexemes = await Lexeme.create([
                        { value: 'cat', approved: true },
                        { value: 'dog', approved: true },
                        { value: 'fish', approved: true },
                        { value: 'catnip', approved: true },
                        { value: 'catdog', approved: false }
                    ]);

                    await LexemeRecord.create(lexemes.map(l => ({
                        learnerId: user.id,
                        lexemeId: l.id
                    })));

                    const { body } = await api.get('/vocabularies/my');

                    expect(body.data).toMatch({
                        title: 'Мой словарь',
                        learnerId: user.id
                    });

                    expect(body.data.lexemes.length).toBe(lexemes.length);
                });
            });

            describe('POST /my', () => {
                it('should add a lexeme to my vocabulary', async () => {
                    const data = {
                        value: 'cat',
                        definition: 'a furry animal'
                    };

                    const { body } = await api.post('/vocabularies/my').send(data);

                    expect(body.data).toMatch({
                        ...data,
                        status: 0
                    });

                    expect(body.data).toIncludeKeys(['reviewDate']);
                });
            });

            describe('PUT /my/:lexemeId', () => {
                it('should update a lexeme', async () => {
                    const data = {
                        value: 'cat',
                        definition: 'a furry animal'
                    };

                    const { body } = await api.post('/vocabularies/my').send(data);

                    expect(body.data).toMatch({
                        ...data,
                        status: 0
                    });

                    expect(body.data).toIncludeKeys(['reviewDate']);
                });
            });

            describe('DELETE /my/:lexemeId', () => {
                it('should delete a lexeme from my vocabulary', async () => {
                    const data = {
                        value: 'cat',
                        definition: 'a furry animal',
                        createdBy: user.id
                    };

                    const lexeme = await Lexeme.create(data);

                    await LexemeRecord.create({
                        lexemeId: lexeme.id,
                        learnerId: data.createdBy
                    });

                    const { body } = await api.delete(`/vocabularies/my/${lexeme.id}`);

                    expect(body.data).toMatch({
                        id: lexeme.id
                    });
                });
            });
        });

        describe('Vocabulary search', () => {
            describe('GET /search', () => {
                beforeEach(async () => {
                    await Lexeme.create([
                        { value: 'cat', approved: true },
                        { value: 'dog', approved: true },
                        { value: 'fish', approved: true },
                        { value: 'catnip', approved: true },
                        { value: 'catdog', approved: false }
                    ]);
                });

                it('should return only approved lexemes', async () => {
                    const { body } = await api.get('/vocabularies/search?q=cat');

                    expect(body.data.length).toBe(2);
                });

                it('should return an empty array if no lexemes are found', async () => {
                    const { body } = await api.get('/vocabularies/search?q=elephant');

                    expect(body.data.length).toBe(0);
                });

                it('should return an empty array if no query is provided', async () => {
                    const { body } = await api.get('/vocabularies/search');

                    expect(body.data.length).toBe(0);
                });

                it('should return an empty array if the query is empty', async () => {
                    const { body } = await api.get('/vocabularies/search?q=');

                    expect(body.data.length).toBe(0);
                });

                it('should return lexemes with batching', async () => {
                    await Lexeme.deleteMany({});

                    const lexemes = Array.from({ length: 21 }, (_, i) => ({
                        value: `cat${i}`,
                        approved: true
                    }));

                    await Lexeme.create(lexemes);

                    const { body } = await api.get('/vocabularies/search?q=cat&p=1&c=10');
                    const { body: body2 } = await api.get('/vocabularies/search?q=cat&p=2&c=10');
                    const { body: body3 } = await api.get('/vocabularies/search?q=cat&p=3&c=10');

                    expect(body.data.length).toBe(10);
                    expect(body.meta.totalCount).toBe(lexemes.length);
                    expect(body.meta.count).toBe(body.data.length);
                    expect(body.meta.more).toBe(true);

                    expect(body2.data.length).toBe(10);
                    expect(body2.meta.count).toBe(body2.data.length);
                    expect(body2.meta.more).toBe(true);

                    expect(body3.data.length).toBe(1);
                    expect(body2.meta.count).toBe(body2.data.length);
                    expect(body3.meta.more).toBe(false);
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
            describe('POST /:vocabularyId', () => {
                it('should add a lexeme to the vocabulary', async () => {
                    const vocabulary = await Vocabulary.create({});

                    const data = {
                        value: 'cat',
                        definition: 'a furry animal'
                    };

                    const { body } = await api.post(`/vocabularies/${vocabulary.id}`).send(data);

                    expect(body.data).toMatch(data);
                    expect(body.data.status).toBe(0, 'The lexeme doesn\'t have a `status` field');
                    expect(body.data.reviewDate).toExist('The lexeme doesn\'t have a `reviewDate` field');
                });
            });

            describe('PUT /:vocabularyId/:lexemeId', () => {
                const initialData = {
                    value: 'cat',
                    definition: 'a furry animal',
                    createdBy: user.id
                };

                const updateData = {
                    definition: 'a furry animal with four legs and a tail'
                };

                it('should update the lexeme if it was created by the learner', async () => {
                    const lexeme = await Lexeme.create({
                        ...initialData
                    });
                    const vocabulary = await Vocabulary.create({
                        lexemeIds: [lexeme.id],
                        learnerId: user.id
                    });

                    const { body } = await api.put(`/vocabularies/${vocabulary.id}/${lexeme.id}`).send(updateData);

                    expect(body.data).toMatch(updateData);
                });

                it('should not update the lexeme if it was created by another learner', async () => {
                    const lexeme = await Lexeme.create({
                        ...initialData,
                        createdBy: createId()
                    });
                    const vocabulary = await Vocabulary.create({
                        lexemeIds: [lexeme.id],
                        learnerId: user.id
                    });

                    const { body, status } = await api.put(`/vocabularies/${vocabulary.id}/${lexeme.id}`).send(updateData);

                    expect(body).toMatch({ ok: false });
                    expect(status).toBe(403);
                });

                it('should update the lexeme if it has not yet been approved', async () => {
                    const lexeme = await Lexeme.create({
                        ...initialData,
                        approved: false
                    });
                    const vocabulary = await Vocabulary.create({
                        lexemeIds: [lexeme.id],
                        learnerId: user.id
                    });

                    const { body } = await api.put(`/vocabularies/${vocabulary.id}/${lexeme.id}`).send(updateData);

                    expect(body.data).toMatch(updateData);
                });

                it('should not update the lexeme if it has been approved', async () => {
                    const lexeme = await Lexeme.create({
                        ...initialData,
                        approved: true
                    });
                    const vocabulary = await Vocabulary.create({
                        lexemeIds: [lexeme.id],
                        learnerId: user.id
                    });

                    const { body } = await api.put(`/vocabularies/${vocabulary.id}/${lexeme.id}`).send(updateData);

                    expect(body.data).toNotMatch(updateData);

                    expect(body.data).toMatch({
                        record: {
                            data: updateData
                        }
                    });
                });
            });

            describe('DELETE /:vocabularyId/:lexemeId', () => {
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

                    const { body } = await api.delete(`/vocabularies/${vocabulary.id}/${lexeme.id}`);

                    expect(body.data).toMatch({
                        id: lexeme.id,
                        vocabularyId: vocabulary.id
                    });
                });
            });
        });
    });