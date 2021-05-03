const constants = require('../../core/models/enrollment/constants');

const defaultEnrollment = {
    status: 'processing',
    domain: 'general',
    type: '',
    format: '',
    age: '',
    teacherType: '',
    level: '',
    experience: '',
    purpose: '',
    preferences: '',
    trialLesson: [],
    schedule: [],
    note: '',
};

const statusOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.StatusLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const domainOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.DomainLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const typeOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.TypeLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const formatOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.FormatLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const ageOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.AgeLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const levelOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.LevelLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const purposeOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.PurposeLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
    }))
];

const teacherTypeOptions = [
    { key: 'null', value: '', text: '' },
    ...Object.entries(constants.TeacherTypeLabel).map(([key, value]) => ({
        key,
        value: key,
        text: value
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