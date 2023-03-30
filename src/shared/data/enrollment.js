const constants = require('../../core/models/enrollment/constants');

const defaultEnrollment = {
    status: 'processing',
    domain: 'general',
    type: '',
    format: '',
    age: '',
    teacherType: '',
    level: '',
    purpose: '',
    experience: '',
    preferences: '',
    lessonDuration: 50,
    trialLessonSchedule: [],
    schedule: [],
    note: '',
    teachers: [],
    managers: []
};

const statusOptions = Object.entries(constants.StatusLabel).map(([key, value]) => ({
    key,
    value: key,
    label: value,
    content: value
}));

const domainOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.DomainLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const typeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.TypeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const formatOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.FormatLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const ageOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.AgeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const levelOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.LevelLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const purposeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.PurposeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

const teacherTypeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(constants.TeacherTypeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

module.exports = {
    ...constants,
    defaultEnrollment,
    statusOptions,
    domainOptions,
    typeOptions,
    formatOptions,
    ageOptions,
    levelOptions,
    purposeOptions,
    teacherTypeOptions
};