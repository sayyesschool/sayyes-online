const { AgeGroup, Domain, Level, Format, TeacherType } = require('../../core/models/common/constants');

const AgeGroupLabel = {
    [AgeGroup.Adults]: 'Взрослые',
    [AgeGroup.Teenagers]: 'Подростки',
    [AgeGroup.Children]: 'Дети'
};

const DomainLabel = {
    [Domain.Business]: 'Деловой английский',
    [Domain.General]: 'Общий разговорный курс',
    [Domain.Prep]: 'Подготовка к экзаменам'
};

const FormatLabel = {
    [Format.Offline]: 'Оффлайн',
    [Format.Online]: 'Онлайн'
};

const LevelLabel = {
    [Level.Beginner]: 'Beginner',
    [Level.Elementary]: 'Elementary (A1)',
    [Level.PreIntermediate]: 'Pre-Intermediate (A2)',
    [Level.Intermediate]: 'Intermediate (B1)',
    [Level.UpperIntermediate]: 'Upper-Intermediate (B2)',
    [Level.Advanced]: 'Advanced (C1)',
    [Level.Proficiency]: 'Proficiency (C2)'
};

const PurposeLabel = {
    work: 'Для работы',
    study: 'Для учебы',
    interview: 'Для собеседования',
    travel: 'Для путешествий',
    hobby: 'Для себя (хобби)',
    exam: 'Для сдачи экзамена',
    immigration: 'Иммиграция'
};

const RoleLabel = {
    admin: 'Администратор',
    editor: 'Редактор',
    learner: 'Ученик',
    teacher: 'Преподаватель'
};

const TeacherTypeLabel = {
    [TeacherType.Bilingual]: 'Билингва',
    [TeacherType.Native]: 'Носитель',
    [TeacherType.Russian]: 'Русскоговорящий'
};

const ageGroupOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(AgeGroupLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const domainOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(DomainLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const formatOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(FormatLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const levelOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(LevelLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const purposeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(PurposeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const teacherTypeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(TeacherTypeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

module.exports = {
    AgeGroupLabel,
    DomainLabel,
    FormatLabel,
    LevelLabel,
    PurposeLabel,
    RoleLabel,
    TeacherTypeLabel,
    ageGroupOptions,
    domainOptions,
    formatOptions,
    levelOptions,
    purposeOptions,
    teacherTypeOptions
};