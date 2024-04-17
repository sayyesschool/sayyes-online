import { Link } from 'react-router-dom';

import Page from 'shared/components/page';

import VocabularyCard from 'lms/components/vocabulary/vocabulary-card';
import VocabularyGrid from 'lms/components/vocabulary/vocabulary-grid';

const vocabularyUrlImg = 'https://sun9-65.userapi.com/impg/Uu2rwvSFaHjmLRrVZCCUey8zBQibcECeaDv0pw/7EXorG_T0hY.jpg?size=1280x200&quality=96&sign=95e15fbb680112eb57fda69bbc5877b7&type=album';

const courseVocabularies = [{
    id: 1,
    title: 'General Eanglish 1',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 53,
    coursePath: '/courses'
},
{
    id: 2,
    title: 'General Eanglish 2',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 13,
    coursePath: '/courses'
},
{
    id: 3,
    title: 'General Eanglish 3',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 0,
    coursePath: '/courses'
},
{
    id: 4,
    title: 'General Eanglish 4',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 123,
    coursePath: '/courses'
},
{
    id: 5,
    title: 'General Eanglish 5',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 53,
    coursePath: '/courses'
},
{
    id: 6,
    title: 'General Eanglish 6',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 143,
    coursePath: '/courses'
},
{
    id: 7,
    title: 'General Eanglish 7',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 10,
    coursePath: '/courses'
},
{
    id: 8,
    title: 'General Eanglish 8',
    description: '',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 123,
    coursePath: '/courses'
}];

const extraVocabularies = [{
    id: 1,
    title: 'Домашние предметы',
    description: 'Предметы для дома',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 53
},
{
    id: 2,
    title: '200 самых частых слов',
    description: 'Часто используемые слова',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 13
},
{
    id: 3,
    title: 'Кулинария',
    description: 'Термины о кухне',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 0
},
{
    id: 4,
    title: 'Туризм',
    description: 'Туристические термины',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 123
},
{
    id: 5,
    title: 'Новичковый словарь',
    description: 'Основные слова',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 53
},
{
    id: 6,
    title: 'Животные',
    description: 'Названия животных',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 143
},
{
    id: 7,
    title: 'Спорт',
    description: 'Словарь о спорте',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 10
},
{
    id: 8,
    title: 'Фразовые глаголы',
    description: 'Фразовые глаголы',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 123
}];

const extraVocabularies2 = [{
    id: 1,
    title: 'Домашние предметы',
    description: 'Предметы для дома',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 53
},
{
    id: 2,
    title: '200 самых частых слов',
    description: 'Часто используемые слова',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 13
},
{
    id: 3,
    title: 'Кулинария',
    description: 'Термины о кухне',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 0
},
{
    id: 4,
    title: 'Туризм',
    description: 'Туристические термины',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 123
},
{
    id: 5,
    title: 'Новичковый словарь',
    description: 'Основные слова',
    url: '/vocabulary/vocabulary-page',
    itemsCount: 53
}];

export default function VocabulariesPage() {
    return (
        <Page className="VocabulariesPage">
            <Page.Content>
                <Page.Header
                    title="Мой словарь"
                />

                <VocabularyCard
                    as={Link}
                    title={'Мой словарь'}
                    subtitle={'Это ваш личный словарь'}
                    itemsCount={49}
                    imageUrl={vocabularyUrlImg}
                    to={{
                        pathname: '/vocabulary/vocabulary-page'
                    }}
                    sx={{ height: 200 }}
                />

                <Page.Header
                    title="Словари Курсов"
                />

                <VocabularyGrid vocabularies={courseVocabularies} />

                <Page.Header
                    title="Extra словари"
                />

                <VocabularyGrid vocabularies={extraVocabularies} />

                <Page.Header
                    title="Подборка extra словарей"
                />

                <VocabularyGrid vocabularies={extraVocabularies2} />
            </Page.Content>
        </Page>
    );
};