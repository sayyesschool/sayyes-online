import Home from 'app/components/home';
import Learners from 'app/components/learners';
import Enrollments from 'app/components/enrollments';
import Lessons from 'app/components/lessons';
import Managers from 'app/components/managers';
// import Meetings from 'app/components/meetings';
import Payments from 'app/components/payments';
import Requests from 'app/components/requests';
import Teachers from 'app/components/teachers';
import Settings from 'app/components/settings';

export default [
    { id: 'home', name: 'Главная', path: '/', exact: true, component: Home, icon: 'dashboard' },
    { id: 'requests', name: 'Заявки', path: '/requests', exact: false, component: Requests, icon: 'contact_phone' },
    { id: 'payments', name: 'Платежи', path: '/payments', exact: false, component: Payments, icon: 'payments' },
    { id: 'enrollments', name: '', path: '/enrollments', exact: false, component: Enrollments, icon: '', hidden: true },
    { id: 'lessons', name: 'Уроки', path: '/lessons', exact: false, component: Lessons, icon: 'event' },
    // { id: 'meetings', name: 'Встречи', path: '/meetings', exact: false, component: Meetings, icon: 'event' },
    { id: 'learners', name: 'Ученики', path: '/learners', exact: false, component: Learners, icon: 'groups' },
    { id: 'teachers', name: 'Преподаватели', path: '/teachers', exact: false, component: Teachers, icon: 'face' },
    { id: 'managers', name: 'Менеджеры', path: '/managers', exact: false, component: Managers, icon: 'support_agent' },
    { id: 'settings', name: 'Настройки', path: '/settings', exact: false, component: Settings, icon: 'settings' }
];