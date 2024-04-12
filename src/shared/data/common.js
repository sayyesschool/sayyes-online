import { AgeGroup, Domain, Format, Level, TeacherType } from '../../core/models/common';

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
    [Level.Proficiency]: 'Proficiency (C2)'
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