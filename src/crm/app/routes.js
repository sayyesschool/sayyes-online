import Enrollments from 'crm/components/enrollments';
import Home from 'crm/components/home';
import Learners from 'crm/components/learners';
import Lessons from 'crm/components/lessons';
import Managers from 'crm/components/managers';
// import Meetings from 'crm/components/meetings';
import Payments from 'crm/components/payments';
import Requests from 'crm/components/requests';
import Settings from 'crm/components/settings';
import Teachers from 'crm/components/teachers';

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