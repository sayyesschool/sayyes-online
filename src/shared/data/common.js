import {
    AgeGroup,
    Completed,
    Domain,
    DueAt,
    Format,
    Level,
    Priority,
    RefEntity,
    TeacherType,
    Theme
} from 'core/models/common';

export const AgeGroupLabel = {
    [AgeGroup.Adults]: 'Взрослые',
    [AgeGroup.Teenagers]: 'Подростки',
    [AgeGroup.Children]: 'Дети'
};

export const DomainLabel = {
    [Domain.Business]: 'Деловой английский',
    [Domain.General]: 'Общий разговорный курс',
    [Domain.Prep]: 'Подготовка к экзаменам'
};

export const FormatLabel = {
    [Format.Offline]: 'Оффлайн',
    [Format.Online]: 'Онлайн'
};

export const LevelLabel = {
    [Level.Beginner]: 'Beginner',
    [Level.Elementary]: 'Elementary (A1)',
    [Level.PreIntermediate]: 'Pre-Intermediate (A2)',
    [Level.Intermediate]: 'Intermediate (B1)',
    [Level.UpperIntermediate]: 'Upper-Intermediate (B2)',
    [Level.Advanced]: 'Advanced (C1)',
    [Level.Proficient]: 'Proficiency (C2)'
};

export const PriorityLabel = {
    [Priority.Low]: 'Низкий',
    [Priority.Medium]: 'Средний',
    [Priority.High]: 'Высокий'
};

export const PriorityColor = {
    [Priority.High]: 'danger',
    [Priority.Medium]: 'warning',
    [Priority.Low]: 'success'
};

export const ThemeLabel = {
    [Theme.Relevance]: 'Актуальность',
    [Theme.Payment]: 'Оплата',
    [Theme.Trial]: 'Пробный урок',
    [Theme.Other]: '(Не указано)'
};

export const RefEntityLabel = {
    [RefEntity.Learner]: 'Ученик',
    [RefEntity.Teacher]: 'Преподаватель',
    [RefEntity.Enrollment]: 'Обучение'
};

export const RefLinkLabel = {
    [RefEntity.Learner]: 'learners',
    [RefEntity.Teacher]: 'teachers',
    [RefEntity.Enrollment]: 'enrollments'
};

export const CompletedLabel = {
    [Completed.Open]: 'Открыт',
    [Completed.Completed]: 'Выполнен'
};

export const dueAtLabel = {
    [DueAt.Today]: 'Сегодня',
    [DueAt.Week]: 'На этой неделе',
    [DueAt.Overdue]: 'Просроченные'
};

export const PurposeLabel = {
    work: 'Для работы',
    study: 'Для учебы',
    interview: 'Для собеседования',
    travel: 'Для путешествий',
    hobby: 'Для себя (хобби)',
    exam: 'Для сдачи экзамена',
    immigration: 'Иммиграция'
};

export const RoleLabel = {
    admin: 'Администратор',
    editor: 'Редактор',
    learner: 'Ученик',
    teacher: 'Преподаватель'
};

export const TeacherTypeLabel = {
    [TeacherType.Bilingual]: 'Билингва',
    [TeacherType.Native]: 'Носитель',
    [TeacherType.Russian]: 'Русскоговорящий'
};

export const ageGroupOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(AgeGroupLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const domainOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(DomainLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const formatOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(FormatLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const levelOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(LevelLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const purposeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(PurposeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const teacherTypeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(TeacherTypeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const priorityOptions = [
    ...Object.entries(PriorityLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const themeOptions = [
    ...Object.entries(ThemeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const completedOptions = [
    ...Object.entries(CompletedLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const dueAtOptions = [
    ...Object.entries(dueAtLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];