import expect from 'expect';

import { toCSV } from 'shared/libs/csv';

describe('toCSV', () => {
    it('should convert data to CSV', () => {
        const data = [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 }
        ];

        const csv = toCSV(data);

        expect(csv).toBe('name,age\nJohn,30\nJane,25\n');
    });

    it('should convert data to CSV with custom fields', () => {
        const data = [
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 }
        ];

        const csv = toCSV(data, ['name']);

        expect(csv).toBe('name\nJohn\nJane\n');
    });

    it('should convert data to CSV with nested fields', () => {
        const data = [
            {
                'id' : '6780eaec0a1f8e0c831657fc',
                'status' : 'new',
                'description' : 'Прохождение теста на сайте',
                'contact' : {
                    'name' : 'Махабат',
                    'email' : 'mmosmonovna@gmai.com'
                },
                'channel' : 'test',
                'source' : '',
                'utm' : {
                    'source' : 'tg_adv_10.01.25_repeating_english',
                    'medium' : null,
                    'campaign' : null,
                    'term' : null,
                    'content' : null
                },
                'data' : {
                    'goal' : 'Для путешествий',
                    'level' : 'Beginner'
                },
                'note' : '',
                'createdAt' : '2025-01-10T09:39:56.824+0000',
                'updatedAt' : '2025-01-10T09:39:56.824+0000',
                '__v' : 0
            }
        ];

        const csv = toCSV(data);

        expect(csv).toBe('id,status,description,contact.name,contact.email,channel,source,utm.source,utm.medium,utm.campaign,utm.term,utm.content,data.goal,data.level,note,createdAt,updatedAt\n6780eaec0a1f8e0c831657fc,new,Прохождение теста на сайте,Махабат,mmosmonovna@gmai.com,test,,tg_adv_10.01.25_repeating_english,,,,,Для путешествий,Beginner,,2025-01-10T09:39:56.824+0000,2025-01-10T09:39:56.824+0000\n');
    });
});