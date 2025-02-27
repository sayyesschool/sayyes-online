import expect from 'expect';

import { models, services } from 'test/_env';

const { Lexeme, LexemeRecord, User, Vocabulary } = models;
const { Dictionary, Vocabulary: VocabularyS } = services;
import {
    APPROVED_LEXEME_DATA,
    LEARNER,
    LEARNER_2,
    LEXEME,
    LEXEMES,
    MANAGER,
    MERGE_LEXEME_1,
    MERGE_LEXEME_2,
    MERGE_LEXEME_3,
    MERGED_LEXEME,
    UPDATED_LEXEME_DATA,
    UPDATED_MERGE_LEXEME_1,
    UPDATED_MERGE_LEXEME_2,
    UPDATED_MERGE_LEXEME_3
} from 'test/_data';

describe('DictionaryService', () => {
    let manager;
    let learner;
    let learner2;
    let vocabulary;
    let vocabulary2;

    before(async () => {
        await User.deleteMany({});
        await Lexeme.deleteMany({});
        await LexemeRecord.deleteMany({});
        manager = await User.create(MANAGER);
        learner = await User.create(LEARNER);
        learner2 = await User.create(LEARNER_2);
        vocabulary = await VocabularyS.create(learner.id, { title: 'Test' });
        vocabulary2 = await VocabularyS.create(learner2.id, { title: 'Test2' });
    });

    afterEach(async () => {
        await Lexeme.deleteMany({});
        await LexemeRecord.deleteMany({});
        await Vocabulary.findByIdAndUpdate(vocabulary.id, { lexemeIds: [] });
        await Vocabulary.findByIdAndUpdate(vocabulary2.id, { lexemeIds: [] });
    });

    describe('search', () => {
        it('should return empty array', async () => {
            const randomValue = 'random value';
            const randomId = '67b7788aaf7b3c518407409f';

            const [totalCount, foundLexemes] = await Dictionary.search(randomValue, randomId);

            expect(totalCount).toBe(0);
            expect(foundLexemes).toEqual([]);
        });

        it('should return all approved lexemes by substring except current (substring is a value)', async () => {
            const lexemes = await Lexeme.create(LEXEMES);

            const kitten = lexemes.find(({ translation }) => translation === 'котёнок');
            const overCats = lexemes.filter(({ id, value, publishStatus }) => value === kitten.value && publishStatus === 'approved' && id !== kitten.id);

            const [totalCount, foundLexemes] = await Dictionary.search(kitten.value, kitten.id);

            expect(totalCount).toBe(overCats.length);
            expect(foundLexemes.map(({ id }) => id)).toEqual(overCats.map(({ id }) => id));
        });

        it('should return all approved lexemes by substring except current (substring at the beginning of value)', async () => {
            const lexemes = await Lexeme.create(LEXEMES);
            const substr = 'act';
            const regex = new RegExp(substr, 'i');
            const actor = lexemes.find(({ translation }) => translation === 'актёр');
            const overLexemesWithSubstr = lexemes.filter(({ id, value, publishStatus }) => regex.test(value) && publishStatus === 'approved' && id !== actor.id);

            const [totalCount, foundLexemes] = await Dictionary.search(substr, actor.id);

            expect(totalCount).toBe(overLexemesWithSubstr.length);
            expect(foundLexemes.map(({ id }) => id)).toEqual(overLexemesWithSubstr.map(({ id }) => id));
        });

        it('should return all approved lexemes by substring except current (substring at the end of value)', async () => {
            const lexemes = await Lexeme.create(LEXEMES);
            const substr = 'ing';
            const regex = new RegExp(substr, 'i');
            const eating = lexemes.find(({ translation }) => translation === 'кушать');
            const overLexemesWithSubstr = lexemes.filter(({ id, value, publishStatus }) => regex.test(value) && publishStatus === 'approved' && id !== eating.id);

            const [totalCount, foundLexemes] = await Dictionary.search(substr, eating.id);

            expect(totalCount).toBe(overLexemesWithSubstr.length);
            expect(foundLexemes.map(({ id }) => id)).toEqual(overLexemesWithSubstr.map(({ id }) => id));
        });

        it('should return all approved lexemes by substring except current (substring in the middle of value)', async () => {
            const lexemes = await Lexeme.create(LEXEMES);
            const substr = 'igh';
            const regex = new RegExp(substr, 'i');
            const night = lexemes.find(({ translation }) => translation === 'ночь');
            const overLexemesWithSubstr = lexemes.filter(({ id, value, publishStatus }) => regex.test(value) && publishStatus === 'approved' && id !== night.id);

            const [totalCount, foundLexemes] = await Dictionary.search(substr, night.id);

            expect(totalCount).toBe(overLexemesWithSubstr.length);
            expect(foundLexemes.map(({ id }) => id)).toEqual(overLexemesWithSubstr.map(({ id }) => id));
        });
    });

    describe('addLexeme', () => {
        it('should return new simple "pending" lexeme', async () => {
            const { value, translation, publishStatus } = await Dictionary.addLexeme(manager.id, LEXEME);

            expect(publishStatus).toBe('pending');
            expect(value).toBe(LEXEME.value);
            expect(translation).toBe(LEXEME.translation);
        });

        it('should return createdBy of created lexeme', async () => {
            const { createdBy } = await Dictionary.addLexeme(manager.id, LEXEME);

            expect(createdBy.toString()).toBe(manager.id);
        });
    });

    describe('get', () => {
        it('should return all "pending" lexemes', async () => {
            await Lexeme.create(LEXEMES);
            const foundLexemes = await Dictionary.get('pending');
            const lexemesPending = LEXEMES.filter(({ publishStatus }) => publishStatus === 'pending');

            expect(foundLexemes.length).toBe(lexemesPending.length);
        });

        it('should return all "approved" lexemes', async () => {
            await Lexeme.create(LEXEMES);
            const foundLexemes = await Dictionary.get('approved');
            const lexemesApproved = LEXEMES.filter(({ publishStatus }) => publishStatus === 'approved');

            expect(foundLexemes.length).toBe(lexemesApproved.length);
        });

        it('should return all "unapproved" lexemes', async () => {
            await Lexeme.create(LEXEMES);
            const foundLexemes = await Dictionary.get('unapproved');
            const lexemesUnapproved = LEXEMES.filter(({ publishStatus }) => publishStatus === 'unapproved');

            expect(foundLexemes.length).toBe(lexemesUnapproved.length);
        });
    });

    describe('updatePublishStatus', () => {
        it('should return "approved" for "unapproved" lexeme', async () => {
            const lexeme = await Lexeme.create({ ...LEXEME, publishStatus: 'unapproved' });

            const updatedLexeme = await Dictionary.updatePublishStatus(lexeme.id, 'approved');

            expect(updatedLexeme.publishStatus).toBe('approved');
        });

        it('should return "unapproved" for "approved" lexeme', async () => {
            const lexeme = await Lexeme.create({ ...LEXEME, publishStatus: 'approved' });

            const updatedLexeme = await Dictionary.updatePublishStatus(lexeme.id, 'unapproved');

            expect(updatedLexeme.publishStatus).toBe('unapproved');
        });
    });

    describe('deleteLexeme', () => {
        it('should return empty array of lexemes', async () => {
            const createdLexeme = await Dictionary.addLexeme(manager.id, LEXEME);
            await Dictionary.deleteLexeme(createdLexeme.id);

            const lexemes = await Lexeme.find();

            expect(lexemes.length).toBe(0);
        });
    });

    describe('updateLexeme', () => {
        it('should return approved lexeme', async () => {
            const createdLexeme = await Dictionary.addLexeme(manager.id, LEXEME);
            const updatedLexeme = await Dictionary.updateLexeme(createdLexeme.id, { ...createdLexeme, ...createdLexeme });

            expect(updatedLexeme.publishStatus).toBe('approved');
        });

        const updateTests = [
            { field: 'value', expected: UPDATED_LEXEME_DATA.value },
            { field: 'translation', expected: UPDATED_LEXEME_DATA.translation },
            { field: 'definition', expected: UPDATED_LEXEME_DATA.definition },
            { field: 'examples', expected: UPDATED_LEXEME_DATA.examples }
        ];

        updateTests.forEach(({ field, expected }) => {
            it(`should return lexeme with updated ${field}`, async () => {
                const createdLexeme = await Dictionary.addLexeme(manager.id, LEXEME);
                const updatedLexeme = await Dictionary.updateLexeme(createdLexeme.id, { ...createdLexeme, [field]: expected });

                expect(updatedLexeme.publishStatus).toBe('approved');
                expect(updatedLexeme[field]).toEqual(expected);
            });
        });

        it('should return full updated lexeme', async () => {
            const createdLexeme = await Dictionary.addLexeme(manager.id, LEXEME);
            const updatedLexeme = await Dictionary.updateLexeme(createdLexeme.id, { ...createdLexeme, ...UPDATED_LEXEME_DATA });

            expect(updatedLexeme.publishStatus).toBe('approved');
            expect(updatedLexeme.value).toBe(UPDATED_LEXEME_DATA.value);
            expect(updatedLexeme.translation).toBe(UPDATED_LEXEME_DATA.translation);
            expect(updatedLexeme.definition).toBe(UPDATED_LEXEME_DATA.definition);
            expect(updatedLexeme.examples).toEqual(UPDATED_LEXEME_DATA.examples);
        });

        it('should return approved lexeme (lexeme has already been approved)', async () => {
            const createdLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, LEXEME);
            const approvedLexeme = await Dictionary.updateLexeme(createdLexeme.id, createdLexeme);
            const updatedLexeme = await Dictionary.updateLexeme(createdLexeme.id, approvedLexeme);

            expect(updatedLexeme.publishStatus).toBe('approved');
        });

        it('should return full updated lexeme (lexeme has already been approved)', async () => {
            const createdLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, LEXEME);
            const approvedLexeme = await Dictionary.updateLexeme(createdLexeme.id, createdLexeme);
            const updatedLexeme = await Dictionary.updateLexeme(createdLexeme.id, { ...approvedLexeme, ...UPDATED_LEXEME_DATA });

            expect(updatedLexeme.publishStatus).toBe('approved');
            expect(updatedLexeme.value).toBe(UPDATED_LEXEME_DATA.value);
            expect(updatedLexeme.translation).toBe(UPDATED_LEXEME_DATA.translation);
            expect(updatedLexeme.definition).toBe(UPDATED_LEXEME_DATA.definition);
            expect(updatedLexeme.examples).toEqual(UPDATED_LEXEME_DATA.examples);
        });

        describe('saving to personal notes', () => {
            const personalNoteTests = [
                { field: 'translation', approveData: { translation: APPROVED_LEXEME_DATA.translation, additionalData: { translation: true } } },
                { field: 'definition', approveData: { definition: APPROVED_LEXEME_DATA.definition, additionalData: { definition: true } } },
                { field: 'examples', approveData: { examples: APPROVED_LEXEME_DATA.examples, additionalData: { examples: UPDATED_LEXEME_DATA.examples } } }
            ];

            personalNoteTests.forEach(({ field, approveData }) => {
                it(`should save "my ${field}" to record`, async () => {
                    const createdLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, LEXEME);
                    const updatedLexeme = await VocabularyS.updateLexeme(learner.id, vocabulary.id, { lexemeId: createdLexeme.id, vocabulary }, UPDATED_LEXEME_DATA);
                    await Dictionary.updateLexeme(createdLexeme.id, { ...updatedLexeme, ...approveData });

                    const foundLexeme = await Lexeme.findById(createdLexeme.id);
                    const foundRecord = await LexemeRecord.findOne({ lexemeId: createdLexeme.id, learnerId: learner.id });

                    if (field === 'examples') {
                        expect(foundLexeme[field].map(({ id }) => id)).toEqual(approveData[field].map(({ id }) => id));
                        expect(foundRecord.data[field].map(({ id }) => id)).toEqual(UPDATED_LEXEME_DATA[field].map(({ id }) => id));
                    } else {
                        expect(foundLexeme[field]).toEqual(approveData[field]);
                        expect(foundRecord.data[field]).toEqual(UPDATED_LEXEME_DATA[field]);
                    }
                });
            });

            it('should save "my notes" to record', async () => {
                const approveData = { ...APPROVED_LEXEME_DATA, additionalData: { translation: true, definition: true, examples: UPDATED_LEXEME_DATA.examples } };

                const createdLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, LEXEME);
                const updatedLexeme = await VocabularyS.updateLexeme(learner.id, vocabulary.id, { lexemeId: createdLexeme.id, vocabulary }, UPDATED_LEXEME_DATA);

                await Dictionary.updateLexeme(createdLexeme.id, { ...updatedLexeme, ...approveData });

                const foundLexeme = await Lexeme.findById(createdLexeme.id);
                const foundRecord = await LexemeRecord.findOne({ lexemeId: createdLexeme.id, learnerId:  learner.id });

                expect(foundLexeme.publishStatus).toBe('approved');
                expect(foundLexeme.translation).toBe(approveData.translation);
                expect(foundLexeme.definition).toBe(approveData.definition);
                expect(foundLexeme.examples.map(({ id }) => id)).toEqual(approveData.examples.map(({ id }) => id));
                expect(foundRecord.data.translation).toEqual(UPDATED_LEXEME_DATA.translation);
                expect(foundRecord.data.definition).toEqual(UPDATED_LEXEME_DATA.definition);
                expect(foundRecord.data.examples.map(({ id }) => id)).toEqual(UPDATED_LEXEME_DATA.examples.map(({ id }) => id));
            });
        });
    });

    describe('mergeLexemes', () => {
        describe('manager', () => {
            it('should return approved lexeme', async () => {
                const firstLexeme = await Dictionary.addLexeme(manager.id, MERGE_LEXEME_1);
                const secondLexeme = await Dictionary.addLexeme(manager.id, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                const mergedLexeme = await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });

                expect(mergedLexeme.publishStatus).toBe('approved');
            });

            it('should delete other merged', async () => {
                const firstLexeme = await Dictionary.addLexeme(manager.id, MERGE_LEXEME_1);
                const secondLexeme = await Dictionary.addLexeme(manager.id, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });
                const foundLexemes = await Lexeme.find();

                expect(foundLexemes.length).toBe(1);
            });
        });

        describe('learner', () => {
            it('should return approved lexeme', async () => {
                const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                const secondLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                const mergedLexeme = await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });

                expect(mergedLexeme.publishStatus).toBe('approved');
            });

            it('should return new lexeme', async () => {
                const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                const secondLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                const mergedLexeme = await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });

                expect(mergedLexeme.value).toBe(MERGED_LEXEME.value);
                expect(mergedLexeme.translation).toBe(MERGED_LEXEME.translation);
            });

            it('should delete other merged', async () => {
                const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                const secondLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });
                const foundLexemes = await Lexeme.find();

                expect(foundLexemes.length).toBe(1);
            });

            describe('personal data', () => {
                const mergeTests = ['translation', 'definition', 'examples' ];

                mergeTests.forEach(field => {
                    it(`should save ${field} of first lexeme in record`, async () => {
                        const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                        const secondLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_2);

                        const updatedFirstLexeme = await VocabularyS.updateLexeme(
                            learner.id, vocabulary.id,
                            { lexemeId: firstLexeme.id, vocabulary },
                            UPDATED_MERGE_LEXEME_1
                        );

                        await VocabularyS.updateLexeme(
                            learner.id, vocabulary.id,
                            { lexemeId: secondLexeme.id, vocabulary },
                            UPDATED_MERGE_LEXEME_2
                        );

                        const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];

                        const mergedLexeme = await Dictionary.mergeLexemes({
                            newLexemeData: MERGED_LEXEME,
                            merge: { [firstLexeme.id]: { [field]: updatedFirstLexeme[field] } },
                            deletedLexemeIds
                        });

                        const foundLexemes = await Lexeme.find();
                        const foundRecords = await LexemeRecord.find();

                        expect(mergedLexeme.publishStatus).toBe('approved');
                        expect(foundLexemes.length).toBe(1);
                        expect(foundRecords.length).toBe(1);

                        if (field === 'examples') {
                            expect(foundRecords[0].data[field].map(({ id }) => id)).toEqual(updatedFirstLexeme[field].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(foundRecords[0].data[field]).toBe(updatedFirstLexeme[field]);
                        }
                    });
                });

                it('should save all data of first lexeme in record', async () => {
                    const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                    const secondLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_2);

                    const updatedFirstLexeme = await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: firstLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_1
                    );

                    await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: secondLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_2
                    );

                    const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];

                    const mergedLexeme = await Dictionary.mergeLexemes({
                        newLexemeData: MERGED_LEXEME,
                        merge: { [firstLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedFirstLexeme[key]])) },
                        deletedLexemeIds
                    });

                    const foundLexemes = await Lexeme.find();
                    const foundRecords = await LexemeRecord.find();

                    expect(mergedLexeme.publishStatus).toBe('approved');
                    expect(foundLexemes.length).toBe(1);
                    expect(foundRecords.length).toBe(1);

                    mergeTests.forEach(field => {
                        if (field === 'examples') {
                            expect(foundRecords[0].data[field].map(({ id }) => id)).toEqual(updatedFirstLexeme[field].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(foundRecords[0].data[field]).toBe(updatedFirstLexeme[field]);
                        }
                    });
                });

                it('should save all data of both lexemes in record', async () => {
                    const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                    const secondLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_2);

                    const updatedFirstLexeme = await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: firstLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_1
                    );

                    const updatedSecondLexeme = await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: secondLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_2
                    );

                    const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];

                    const mergedLexeme = await Dictionary.mergeLexemes({
                        newLexemeData: MERGED_LEXEME,
                        merge: {
                            [firstLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedFirstLexeme[key]])),
                            [secondLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedSecondLexeme[key]]))
                        },
                        deletedLexemeIds
                    });

                    const foundLexemes = await Lexeme.find();
                    const foundRecords = await LexemeRecord.find();

                    expect(mergedLexeme.publishStatus).toBe('approved');
                    expect(foundLexemes.length).toBe(1);
                    expect(foundRecords.length).toBe(1);

                    mergeTests.forEach(field => {
                        if (field === 'examples') {
                            expect(foundRecords[0].data.examples.map(({ id }) => id)).toEqual([...updatedFirstLexeme.examples, ...updatedSecondLexeme.examples].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(foundRecords[0].data[field]).toBe([updatedFirstLexeme, updatedSecondLexeme].map(item => item[field]).join(' '));
                        }
                    });
                });
            });
        });

        describe('learner, learner2', () => {
            it('should return approved lexeme', async () => {
                const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                const mergedLexeme = await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });

                expect(mergedLexeme.publishStatus).toBe('approved');
            });

            it('should return new lexeme', async () => {
                const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                const mergedLexeme = await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });

                expect(mergedLexeme.value).toBe(MERGED_LEXEME.value);
                expect(mergedLexeme.translation).toBe(MERGED_LEXEME.translation);
            });

            it('should delete other merged', async () => {
                const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);
                const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];
                await Dictionary.mergeLexemes({ newLexemeData: MERGED_LEXEME, deletedLexemeIds });
                const foundLexemes = await Lexeme.find();

                expect(foundLexemes.length).toBe(1);
            });

            describe('personal data', () => {
                const mergeTests = ['translation', 'definition', 'examples' ];

                mergeTests.forEach(field => {
                    it(`should save ${field} of first lexeme in record`, async () => {
                        const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                        const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);

                        const updatedFirstLexeme = await VocabularyS.updateLexeme(
                            learner.id, vocabulary.id,
                            { lexemeId: firstLexeme.id, vocabulary },
                            UPDATED_MERGE_LEXEME_1
                        );

                        await VocabularyS.updateLexeme(
                            learner2.id, vocabulary2.id,
                            { lexemeId: secondLexeme.id, vocabulary2 },
                            UPDATED_MERGE_LEXEME_2
                        );

                        const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];

                        const mergedLexeme = await Dictionary.mergeLexemes({
                            newLexemeData: MERGED_LEXEME,
                            merge: { [firstLexeme.id]: { [field]: updatedFirstLexeme[field] } },
                            deletedLexemeIds
                        });

                        const foundLexemes = await Lexeme.find();
                        const foundRecords = await LexemeRecord.find();
                        const firstRecord = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner.id);

                        expect(mergedLexeme.publishStatus).toBe('approved');
                        expect(foundLexemes.length).toBe(1);
                        expect(foundRecords.length).toBe(2);

                        if (field === 'examples') {
                            expect(firstRecord.data[field].map(({ id }) => id)).toEqual(updatedFirstLexeme[field].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(firstRecord.data[field]).toBe(updatedFirstLexeme[field]);
                        }
                    });
                });

                it('should save all data of first lexeme in record', async () => {
                    const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                    const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);

                    const updatedFirstLexeme = await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: firstLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_1
                    );

                    await VocabularyS.updateLexeme(
                        learner2.id, vocabulary2.id,
                        { lexemeId: secondLexeme.id, vocabulary2 },
                        UPDATED_MERGE_LEXEME_2
                    );

                    const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];

                    const mergedLexeme = await Dictionary.mergeLexemes({
                        newLexemeData: MERGED_LEXEME,
                        merge: { [firstLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedFirstLexeme[key]])) },
                        deletedLexemeIds
                    });

                    const foundLexemes = await Lexeme.find();
                    const foundRecords = await LexemeRecord.find();
                    const firstRecord = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner.id);

                    expect(mergedLexeme.publishStatus).toBe('approved');
                    expect(foundLexemes.length).toBe(1);
                    expect(foundRecords.length).toBe(2);

                    mergeTests.forEach(field => {
                        if (field === 'examples') {
                            expect(firstRecord.data[field].map(({ id }) => id)).toEqual(updatedFirstLexeme[field].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(firstRecord.data[field]).toBe(updatedFirstLexeme[field]);
                        }
                    });
                });

                it('should save all data of both lexemes in record', async () => {
                    const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                    const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);

                    const updatedFirstLexeme = await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: firstLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_1
                    );

                    const updatedSecondLexeme = await VocabularyS.updateLexeme(
                        learner2.id, vocabulary2.id,
                        { lexemeId: secondLexeme.id, vocabulary2 },
                        UPDATED_MERGE_LEXEME_2
                    );

                    const deletedLexemeIds = [firstLexeme.id, secondLexeme.id];

                    const mergedLexeme = await Dictionary.mergeLexemes({
                        newLexemeData: MERGED_LEXEME,
                        merge: {
                            [firstLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedFirstLexeme[key]])),
                            [secondLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedSecondLexeme[key]]))
                        },
                        deletedLexemeIds
                    });

                    const foundLexemes = await Lexeme.find();
                    const foundRecords = await LexemeRecord.find();
                    const firstRecord = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner.id);
                    const secondRecord = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner2.id);

                    expect(mergedLexeme.publishStatus).toBe('approved');
                    expect(foundLexemes.length).toBe(1);
                    expect(foundRecords.length).toBe(2);

                    mergeTests.forEach(field => {
                        if (field === 'examples') {
                            expect(firstRecord.data[field].map(({ id }) => id)).toEqual(updatedFirstLexeme[field].map(({ id }) => id));
                            expect(secondRecord.data[field].map(({ id }) => id)).toEqual(updatedSecondLexeme[field].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(firstRecord.data[field]).toBe(updatedFirstLexeme[field]);
                            expect(secondRecord.data[field]).toBe(updatedSecondLexeme[field]);
                        }
                    });
                });
            });
        });

        describe('learner, learner2 - (2 lexemes + 1 lexeme)', () => {
            describe('personal data', () => {
                const mergeTests = ['translation', 'definition', 'examples' ];

                mergeTests.forEach(field => {
                    it(`should save ${field} of both lexemes of one learner in record`, async () => {
                        const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                        const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);
                        const thirdLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_3);

                        await VocabularyS.updateLexeme(
                            learner.id, vocabulary.id,
                            { lexemeId: firstLexeme.id, vocabulary },
                            UPDATED_MERGE_LEXEME_1
                        );

                        const updatedSecondLexeme = await VocabularyS.updateLexeme(
                            learner2.id, vocabulary2.id,
                            { lexemeId: secondLexeme.id, vocabulary2 },
                            UPDATED_MERGE_LEXEME_2
                        );

                        const updatedThirdLexeme = await VocabularyS.updateLexeme(
                            learner2.id, vocabulary2.id,
                            { lexemeId: thirdLexeme.id, vocabulary2 },
                            UPDATED_MERGE_LEXEME_3
                        );

                        const deletedLexemeIds = [firstLexeme.id, secondLexeme.id, updatedThirdLexeme.id];

                        const mergedLexeme = await Dictionary.mergeLexemes({
                            newLexemeData: MERGED_LEXEME,
                            merge: {
                                [secondLexeme.id]: { [field]: updatedSecondLexeme[field] },
                                [thirdLexeme.id]: { [field]: updatedThirdLexeme[field] }
                            },
                            deletedLexemeIds
                        });

                        const foundLexemes = await Lexeme.find();
                        const foundRecords = await LexemeRecord.find();
                        const recordWithData = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner2.id);

                        expect(mergedLexeme.publishStatus).toBe('approved');
                        expect(foundLexemes.length).toBe(1);
                        expect(foundRecords.length).toBe(2);

                        if (field === 'examples') {
                            expect(recordWithData.data.examples.map(({ id }) => id)).toEqual([...updatedSecondLexeme.examples, ...updatedThirdLexeme.examples].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(recordWithData.data[field]).toBe([updatedSecondLexeme, updatedThirdLexeme].map(item => item[field]).join(' '));
                        }
                    });
                });

                it('should save all data of both lexemes of one learner in record', async () => {
                    const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                    const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);
                    const thirdLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_3);

                    await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: firstLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_1
                    );

                    const updatedSecondLexeme = await VocabularyS.updateLexeme(
                        learner2.id, vocabulary2.id,
                        { lexemeId: secondLexeme.id, vocabulary2 },
                        UPDATED_MERGE_LEXEME_2
                    );

                    const updatedThirdLexeme = await VocabularyS.updateLexeme(
                        learner2.id, vocabulary2.id,
                        { lexemeId: thirdLexeme.id, vocabulary2 },
                        UPDATED_MERGE_LEXEME_3
                    );
                    const deletedLexemeIds = [firstLexeme.id, secondLexeme.id, updatedThirdLexeme.id];

                    const mergedLexeme = await Dictionary.mergeLexemes({
                        newLexemeData: MERGED_LEXEME,
                        merge: {
                            [secondLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedSecondLexeme[key]])),
                            [thirdLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedThirdLexeme[key]]))
                        },
                        deletedLexemeIds
                    });

                    const foundLexemes = await Lexeme.find();
                    const foundRecords = await LexemeRecord.find();
                    const recordWithData = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner2.id);

                    expect(mergedLexeme.publishStatus).toBe('approved');
                    expect(foundLexemes.length).toBe(1);
                    expect(foundRecords.length).toBe(2);

                    mergeTests.forEach(field => {
                        if (field === 'examples') {
                            expect(recordWithData.data.examples.map(({ id }) => id)).toEqual([...updatedSecondLexeme.examples, ...updatedThirdLexeme.examples].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(recordWithData.data[field]).toBe([updatedSecondLexeme, updatedThirdLexeme].map(item => item[field]).join(' '));
                        }
                    });
                });

                it('should save all data of both lexemes of both learners in record', async () => {
                    const firstLexeme = await VocabularyS.addLexeme(learner.id, vocabulary.id, vocabulary, MERGE_LEXEME_1);
                    const secondLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_2);
                    const thirdLexeme = await VocabularyS.addLexeme(learner2.id, vocabulary2.id, vocabulary2, MERGE_LEXEME_3);

                    const updatedFirstLexeme = await VocabularyS.updateLexeme(
                        learner.id, vocabulary.id,
                        { lexemeId: firstLexeme.id, vocabulary },
                        UPDATED_MERGE_LEXEME_1
                    );

                    const updatedSecondLexeme = await VocabularyS.updateLexeme(
                        learner2.id, vocabulary2.id,
                        { lexemeId: secondLexeme.id, vocabulary2 },
                        UPDATED_MERGE_LEXEME_2
                    );

                    const updatedThirdLexeme = await VocabularyS.updateLexeme(
                        learner2.id, vocabulary2.id,
                        { lexemeId: thirdLexeme.id, vocabulary2 },
                        UPDATED_MERGE_LEXEME_3
                    );

                    const deletedLexemeIds = [firstLexeme.id, secondLexeme.id, updatedThirdLexeme.id];

                    const mergedLexeme = await Dictionary.mergeLexemes({
                        newLexemeData: MERGED_LEXEME,
                        merge: {
                            [firstLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedFirstLexeme[key]])),
                            [secondLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedSecondLexeme[key]])),
                            [thirdLexeme.id]: Object.fromEntries( mergeTests.map(key => [key, updatedThirdLexeme[key]]))
                        },
                        deletedLexemeIds
                    });

                    const foundLexemes = await Lexeme.find();
                    const foundRecords = await LexemeRecord.find();
                    const firstRecord = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner.id);
                    const secondRecord = foundRecords.find(({ learnerId }) => learnerId.toJSON() === learner2.id);

                    expect(mergedLexeme.publishStatus).toBe('approved');
                    expect(foundLexemes.length).toBe(1);
                    expect(foundRecords.length).toBe(2);

                    mergeTests.forEach(field => {
                        if (field === 'examples') {
                            expect(firstRecord.data.examples.map(({ id }) => id)).toEqual([...updatedFirstLexeme.examples].map(({ id }) => id));
                            expect(secondRecord.data.examples.map(({ id }) => id)).toEqual([...updatedSecondLexeme.examples, ...updatedThirdLexeme.examples].map(({ id }) => id));
                        } else {
                            expect(mergedLexeme[field]).toBe(MERGED_LEXEME[field]);
                            expect(firstRecord.data[field]).toBe(updatedFirstLexeme[field]);
                            expect(secondRecord.data[field]).toBe([updatedSecondLexeme, updatedThirdLexeme].map(item => item[field]).join(' '));
                        }
                    });
                });
            });
        });
    });
});