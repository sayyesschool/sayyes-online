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

const statusOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.StatusLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const domainOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.DomainLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const typeOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.TypeLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const formatOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.FormatLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const ageOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.AgeLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const levelOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.LevelLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const purposeOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.PurposeLabel).map(([key, value]) => ({
        key,
        value: key,
        content: value
    }))
];

const teacherTypeOptions = [
    { key: 'null', value: '', content: '' },
    ...Object.entries(constants.TeacherTypeLabel).map(([key, value]) => ({
        key,
        value: key,
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