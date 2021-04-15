export default [
    { key: 'home', url: '/', text: 'Главная', icon: 'home', exact: true },
    null,
    { key: 'requests', url: '/requests', text: 'Заявки', icon: 'contact_phone', exact: false },
    { key: 'payments', url: '/payments', text: 'Платежи', icon: 'payments', exact: false },
    { key: 'packs', url: '/packs', text: 'Пакеты', icon: 'sell', exact: false },
    null,
    { key: 'lessons', url: '/lessons', text: 'Уроки', icon: 'event', exact: false },
    { key: 'meetings', url: '/meetings', text: 'Встречи', icon: 'event', exact: false },
    null,
    { key: 'courses', url: '/courses', text: 'Курсы', icon: 'library_books', exact: false },
    { key: 'materials', url: '/materials', text: 'Материалы', icon: 'book', exact: false },
    null,
    { key: 'clients', url: '/clients', text: 'Клиенты', icon: 'groups', exact: false, indent: true },
    { key: 'teachers', url: '/teachers', text: 'Преподаватели', icon: 'people', exact: false, indent: true },
    { key: 'managers', url: '/managers', text: 'Менеджеры', icon: 'people_alt', exact: false, indent: true },
];