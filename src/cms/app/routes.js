import Home from 'app/components/home';
import Courses from 'app/components/courses';
import Materials from 'app/components/materials';

export default [
    { id: 'home', title: 'Главная', path: '/', exact: true, component: Home, icon: 'dashboard' },
    { id: 'courses', title: 'Курсы', path: '/courses', exact: false, component: Courses, icon: 'library_books' },
    { id: 'materials', title: 'Материалы', path: '/materials', exact: false, component: Materials, icon: 'book' }
];