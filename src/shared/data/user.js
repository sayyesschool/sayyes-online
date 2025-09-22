import { UserDomain } from 'core/models/user/constants';

export const UserDomainLabel = {
    [UserDomain.Class]: 'Класс',
    [UserDomain.Club]: 'Клуб',
    [UserDomain.CMS]: 'CMS',
    [UserDomain.CRM]: 'CRM',
    [UserDomain.LK]: 'ЛК',
    [UserDomain.LMS]: 'LMS'
};

export const UserDomainIcons = {
    lk: 'account_circle',
    lms: 'school',
    crm: 'manage_accounts',
    cms: 'book',
    club: 'groups'
};

export const userDomainOptions = [
    ...Object.entries(UserDomainLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const genderOptions = [
    { key: 'male', value: 'male', label: 'Мужской' },
    { key: 'female', value: 'female', label: 'Женский' }
];