import { CLUB_URL } from 'shared/constants';

export default [
    { key: 'home', to: '/', text: 'Главная', icon: 'home', exact: true },
    // { key: 'students', to: '/enrollments', text: 'Ученики', icon: 'people', exact: false },
    { key: 'vocabularies', to: '/vocabularies', text: 'Словари', icon: 'dictionary', exact: false },
    // { key: 'courses', to: '/courses', text: 'Курсы', icon: 'web', exact: false },
    // { key: 'materials', to: '/materials', text: 'Материалы', icon: 'book', exact: false }
    { key: 'club', href: CLUB_URL, text: 'Разговорный клуб', icon: 'communication', exact: true }
];