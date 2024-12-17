import Enrollments from 'crm/components/enrollments';
import Home from 'crm/components/home';
import Learners from 'crm/components/learners';
import Lessons from 'crm/components/lessons';
import Managers from 'crm/components/managers';
import Meetings from 'crm/components/meetings';
import Memberships from 'crm/components/memberships';
import Payments from 'crm/components/payments';
import Requests from 'crm/components/requests';
import Settings from 'crm/components/settings';
import Teachers from 'crm/components/teachers';

export default [
    {
        id: 'home',
        name: 'Главная',
        path: '/',
        exact: true,
        component: Home,
        icon: 'dashboard'
    },
    {
        id: 'requests',
        name: 'Заявки',
        path: '/requests',
        exact: false,
        component: Requests,
        icon: 'contact_phone',
        permissions: ['all', 'requests']
    },
    {
        id: 'enrollments',
        name: '',
        path: '/enrollments',
        exact: false,
        component: Enrollments,
        icon: '',
        hidden: true,
        permissions: ['all', 'enrollments']
    },
    {
        id: 'lessons',
        name: 'Уроки',
        path: '/lessons',
        exact: false,
        component: Lessons,
        icon: 'event',
        permissions: ['all', 'lessons']
    },
    {
        id: 'meetings',
        name: 'Встречи',
        path: '/meetings',
        exact: false,
        component: Meetings,
        icon: 'event',
        permissions: ['all', 'meetings']
    },
    {
        id: 'memberships',
        name: 'Абонементы',
        path: '/memberships',
        exact: false,
        component: Memberships,
        icon: 'confirmation_number',
        permissions: ['all', 'memberships']
    },
    {
        id: 'payments',
        name: 'Платежи',
        path: '/payments',
        exact: false,
        component: Payments,
        icon: 'payments',
        permissions: ['all', 'payments']
    },
    {
        id: 'learners',
        name: 'Ученики',
        path: '/learners',
        exact: false,
        component: Learners,
        icon: 'groups',
        permissions: ['all', 'learners', 'users']
    },
    {
        id: 'teachers',
        name: 'Преподаватели',
        path: '/teachers',
        exact: false,
        component: Teachers,
        icon: 'face',
        permissions: ['all', 'teachers', 'users']
    },
    {
        id: 'managers',
        name: 'Менеджеры',
        path: '/managers',
        exact: false,
        component: Managers,
        icon: 'support_agent',
        permissions: ['all', 'managers', 'users']
    },
    {
        id: 'settings',
        name: 'Настройки',
        path: '/settings',
        exact: false,
        component: Settings,
        icon: 'settings',
        permissions: ['all', 'settings']
    }
];