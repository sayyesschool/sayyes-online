import expect from 'expect';

import { createId } from 'test/helpers';
import {
    LEARNER,
    LEARNER_2,
    LEXEME_DATA,
    LEXEME_WITH_LEARNER,
    LEXEME_WITH_MANAGER,
    LEXEMES,
    MANAGER,
    MERGE_LEXEME_1,
    MERGE_LEXEME_2,
    MERGE_LEXEME_3,
    MERGED_LEXEME,
    UPDATED_LEXEME_DATA
} from 'test/_data';
import { models, services } from 'test/_env';

const { Lexeme, LexemeRecord, User } = models;
const { Dictionary } = services;

describe('DictionaryService', () => {
    let manager;
    let learner;
    let learner2;

    before(async () => {
        await User.deleteMany({});
        await Lexeme.deleteMany({});
        await LexemeRecord.deleteMany({});
        manager = await User.create(MANAGER);
        learner = await User.create(LEARNER);
        learner2 = await User.create(LEARNER_2);
    });

    afterEach(async () => {
        // await Lexeme.deleteMany({});
        await LexemeRecord.deleteMany({});
    });

    describe('search', () => {
        let lexemes;

        before(async () => {
            lexemes = await Lexeme.create(LEXEMES);
        });

        after(async () => {
            await Lexeme.deleteMany({});
        });

        it('returns approved lexemes matching query', async () => {
            const expectedResults = lexemes.filter(lexeme => lexeme.value.includes('cat'));

            const { results } = await Dictionary.search('cat');

            expect(results.length).toBe(expectedResults.length);
        });

        it('returns results without excluded ids', async () => {
            const matchingLexemes = lexemes.filter(lexeme => lexeme.value.includes('cat'));
            const excludedIds = matchingLexemes.map(({ id }) => id).slice(0, 1);
            const expectedResults = matchingLexemes.slice(1);

            const { results } = await Dictionary.search('cat', { exclude: excludedIds });

            expect(results.length).toBe(expectedResults.length);
            expect(results.map(({ id }) => id)).toEqual(expectedResults.map(({ id }) => id));
        });

        it('returns empty results for nonexistent value', async () => {
            const { results, totalCount } = await Dictionary.search('doesnotexist');

            expect(results).toEqual([]);
            expect(totalCount).toBe(0);
        });
    });

    describe('createLexeme', () => {
        after(async () => {
            await Lexeme.deleteMany({});
        });

        it('creates lexeme', async () => {
            const lexeme = await Dictionary.createLexeme(LEXEME_DATA);

            expect(lexeme).toMatch(LEXEME_DATA);
            expect(lexeme.publishStatus).toBe(Lexeme.Status.Pending);
        });

        it('creates lexeme with `createdBy`', async () => {
            const lexeme = await Dictionary.createLexeme(LEXEME_DATA, learner.id);

            expect(lexeme).toMatch(LEXEME_DATA);
            expect(lexeme.createdBy).toEqual(learner.id);
        });
    });

    describe('updateLexeme', () => {
        after(async () => {
            await Lexeme.deleteMany({});
        });

        it('updates lexeme', async () => {
            const lexeme = await Lexeme.create(LEXEME_DATA);

            const updatedLexeme = await Dictionary.updateLexeme(lexeme.id, UPDATED_LEXEME_DATA);

            expect(updatedLexeme).toMatch(UPDATED_LEXEME_DATA);
        });
    });

    describe('deleteLexeme', () => {
        after(async () => {
            await Lexeme.deleteMany({});
        });

        it('deletes lexeme', async () => {
            const lexeme = await Lexeme.create(LEXEME_DATA);

            const deletedLexeme = await Dictionary.deleteLexeme(lexeme.id);
            const foundLexeme = await Lexeme.findById(deletedLexeme.id);

            expect(deletedLexeme).toExist();
            expect(foundLexeme).toBe(null);
        });
    });

    describe('approveLexeme', () => {
        after(async () => {
            await Lexeme.deleteMany({});
        });

        it('approves lexeme', async () => {
            const lexeme = await Lexeme.create(LEXEME_DATA);

            const approvedLexeme = await Dictionary.approveLexeme(lexeme.id, UPDATED_LEXEME_DATA);

            expect(approvedLexeme.publishStatus).toBe(Lexeme.Status.Approved);
        });

        it('saves additional data to learner\'s record', async () => {
            const lexeme = await Lexeme.create(LEXEME_WITH_LEARNER);
            await LexemeRecord.create({
                lexemeId: lexeme.id,
                learnerId: lexeme.createdBy
            });

            const approvedLexeme = await Dictionary.approveLexeme(
                lexeme.id,
                UPDATED_LEXEME_DATA,
                {
                    translation: true,
                    definition: true,
                    examples: UPDATED_LEXEME_DATA.examples
                }
            );

            const record = await LexemeRecord.findOne({
                lexemeId: lexeme.id,
                learnerId: learner.id
            });

            expect(approvedLexeme).toExist();
            expectToMatch(record.data, lexeme);
        });

        it('throws error if lexeme is already approved', async () => {
            const createdLexeme = await Lexeme.create(LEXEME_DATA);
            await Dictionary.approveLexeme(createdLexeme.id, UPDATED_LEXEME_DATA);

            try {
                await Dictionary.approveLexeme(createdLexeme.id, UPDATED_LEXEME_DATA);
            } catch (error) {
                expect(error.code).toBe(400);
            }
        });

        it('throws error if lexeme is not found', async () => {
            try {
                await Dictionary.approveLexeme(createId(), learner.id, { ...UPDATED_LEXEME_DATA });
            } catch (error) {
                expect(error.code).toBe(404);
            }
        });
    });

    describe('mergeLexemes', () => {
        describe('base cases', () => {
            let lexemes = [];

            beforeEach(async () => {
                lexemes = await Lexeme.create([
                    MERGE_LEXEME_1,
                    MERGE_LEXEME_2
                ]);
            });

            it('creates new approved lexeme', async () => {
                const mergedLexeme = await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME
                );

                expect(mergedLexeme).toMatch(MERGED_LEXEME);
                expect(mergedLexeme.publishStatus).toBe('approved');
            });

            it('deletes merging lexemes', async () => {
                await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME
                );

                const foundLexemes = await Promise.all(lexemes.map(l => Lexeme.findById(l.id))).then(results => results.filter(Boolean));

                expect(foundLexemes.length).toBe(0);
            });
        });

        describe('from one learner', () => {
            let lexemes = [];

            beforeEach(async () => {
                lexemes = await Lexeme.create([
                    MERGE_LEXEME_1,
                    MERGE_LEXEME_2
                ]);

                await LexemeRecord.create(lexemes.map(l => ({
                    learnerId: learner.id,
                    lexemeId: l.id,
                    data: {
                        translation: l.translation,
                        definition: l.definition,
                        examples: l.examples
                    }
                })));
            });

            it('saves lexeme data to record', async () => {
                const [lexeme] = lexemes.map(l => l.toJSON());

                await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME,
                    {
                        [lexeme.id]: {
                            translation: lexeme.translation,
                            definition: lexeme.definition,
                            examples: lexeme.examples
                        }
                    }
                );

                const records = await LexemeRecord.find();
                const data = records[0].data.toJSON();

                expect(records.length).toBe(1);
                expectToMatch(data, lexeme);
            });

            it('saves lexemes\' data to record', async () => {
                const [lexeme1, lexeme2] = lexemes.map(l => l.toJSON());

                await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME,
                    {
                        [lexeme1.id]: {
                            translation: lexeme1.translation,
                            definition: lexeme1.definition,
                            examples: lexeme1.examples
                        },
                        [lexeme2.id]: {
                            translation: lexeme2.translation,
                            definition: lexeme2.definition,
                            examples: lexeme2.examples
                        }
                    }
                );

                const records = await LexemeRecord.find();
                const data = records[0].data.toJSON();

                expect(records.length).toBe(1);
                expectToMatch(data, lexeme1);
                expectToMatch(data, lexeme2);
            });
        });

        describe('from multiple learners with equal amount of lexemes', () => {
            let lexemes = [];

            beforeEach(async () => {
                lexemes = await Lexeme.create([
                    MERGE_LEXEME_1,
                    MERGE_LEXEME_2
                ]);

                await LexemeRecord.create(lexemes.map(l => ({
                    learnerId: learner.id,
                    lexemeId: l.id,
                    data: {
                        translation: l.translation,
                        definition: l.definition,
                        examples: l.examples
                    }
                })));

                await LexemeRecord.create(lexemes.map(l => ({
                    learnerId: learner2.id,
                    lexemeId: l.id,
                    data: {
                        translation: l.translation,
                        definition: l.definition,
                        examples: l.examples
                    }
                })));
            });

            it('saves lexeme data to records', async () => {
                const [lexeme] = lexemes;

                await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME,
                    {
                        [lexeme.id]: {
                            translation: lexeme.translation,
                            definition: lexeme.definition,
                            examples: lexeme.examples
                        }
                    }
                );

                const records = await LexemeRecord.find();
                const [data1, data2] = records.map(r => r.data);

                expect(records.length).toBe(2);
                expectToMatch(data1, lexeme);
                expectToMatch(data2, lexeme);
            });

            it('saves lexemes\' data to records', async () => {
                const [lexeme1, lexeme2] = lexemes;

                await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME,
                    {
                        [lexeme1.id]: {
                            translation: lexeme1.translation,
                            definition: lexeme1.definition,
                            examples: lexeme1.examples
                        },
                        [lexeme2.id]: {
                            translation: lexeme2.translation,
                            definition: lexeme2.definition,
                            examples: lexeme2.examples
                        }
                    }
                );

                const records = await LexemeRecord.find();
                const [data1, data2] = records.map(r => r.data);

                expect(records.length).toBe(2);
                expectToMatch(data1, lexeme1);
                expectToMatch(data1, lexeme2);
                expectToMatch(data2, lexeme1);
                expectToMatch(data2, lexeme2);
            });
        });

        describe.skip('from multiple learners with different amount of lexemes', () => {
            let lexemes = [];

            beforeEach(async () => {
                lexemes = await Lexeme.create([
                    MERGE_LEXEME_1,
                    MERGE_LEXEME_2,
                    MERGE_LEXEME_3
                ]);

                await LexemeRecord.create([
                    lexemes[0],
                    lexemes[1]
                ].map(l => ({
                    learnerId: learner.id,
                    lexemeId: l.id,
                    data: {
                        translation: l.translation,
                        definition: l.definition,
                        examples: l.examples
                    }
                })));

                await LexemeRecord.create([
                    lexemes[0],
                    lexemes[1],
                    lexemes[2]
                ].map(l => ({
                    learnerId: learner2.id,
                    lexemeId: l.id,
                    data: {
                        translation: l.translation,
                        definition: l.definition,
                        examples: l.examples
                    }
                })));
            });

            it('saves lexeme data to records', async () => {
                const [lexeme] = lexemes;

                const merged = await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME,
                    {
                        [lexeme.id]: {
                            translation: lexeme.translation,
                            definition: lexeme.definition,
                            examples: lexeme.examples
                        }
                    }
                );

                const records = await LexemeRecord.find();

                // const [data1, data2] = records.map(r => r.data);

                // expect(records.length).toBe(2);
                // expectToMatch(data1, lexeme);
                // expectToMatch(data2, lexeme);
            });

            it('saves lexemes\' data to records', async () => {
                const [lexeme1, lexeme2] = lexemes;

                await Dictionary.mergeLexemes(
                    lexemes.map(l => l.id),
                    MERGED_LEXEME,
                    {
                        [lexeme1.id]: {
                            translation: lexeme1.translation,
                            definition: lexeme1.definition,
                            examples: lexeme1.examples
                        },
                        [lexeme2.id]: {
                            translation: lexeme2.translation,
                            definition: lexeme2.definition,
                            examples: lexeme2.examples
                        }
                    }
                );

                const records = await LexemeRecord.find();
                const [data1, data2] = records.map(r => r.data);

                expect(records.length).toBe(2);
                expectToMatch(data1, lexeme1);
                expectToMatch(data1, lexeme2);
                expectToMatch(data2, lexeme1);
                expectToMatch(data2, lexeme2);
            });
        });
    });
});

function expectToMatch(a, b) {
    if (a.translation) {
        expect(a.translation).toInclude(b.translation);
    }

    if (a.definition) {
        expect(a.definition).toInclude(b.definition);
    }

    b.examples.map(e => e.id).forEach(e => expect(a.examples.map(e => e.id)).toInclude(e));
}