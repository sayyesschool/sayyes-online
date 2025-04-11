import Courses from 'cms/components/courses';
import Dictionary from 'cms/components/dictionary';
import Home from 'cms/components/home';
import Materials from 'cms/components/materials';
import Vocabularies from 'cms/components/vocabularies';

export default [
    { id: 'home', title: 'Главная', path: '/', exact: true, component: Home, icon: 'dashboard' },
    { id: 'courses', title: 'Курсы', path: '/courses', exact: false, component: Courses, icon: 'library_books' },
    { id: 'materials', title: 'Материалы', path: '/materials', exact: false, component: Materials, icon: 'book' },
    { id: 'dictionary', title: 'Глобальный словарь', path: '/dictionary', exact: false, component: Dictionary, icon: 'dictionary' },
    { id: 'vocabularies', title: 'Экстра словари', path: '/vocabularies', exact: false, component: Vocabularies, icon: 'lists' }
];