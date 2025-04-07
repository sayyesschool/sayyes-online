import { EnrollmentStatus, EnrollmentType } from 'core/models/enrollment/constants';

export const StatusIcon = {
    [EnrollmentStatus.Active]: 'school',
    [EnrollmentStatus.Canceled]: 'cancel',
    [EnrollmentStatus.Completed]: 'check_circle',
    [EnrollmentStatus.Payment]: 'payment',
    [EnrollmentStatus.Postponed]: 'next_plan',
    [EnrollmentStatus.Processing]: 'pending',
    [EnrollmentStatus.Trial]: 'event_available'
};

export const StatusLabel = {
    [EnrollmentStatus.Active]: 'Активное',
    [EnrollmentStatus.Canceled]: 'Отменено',
    [EnrollmentStatus.Completed]: 'Завершено',
    [EnrollmentStatus.Payment]: 'Оплата',
    [EnrollmentStatus.Postponed]: 'Отложено',
    [EnrollmentStatus.Processing]: 'В обработке',
    [EnrollmentStatus.Trial]: 'Пробный урок'
};

export const TypeLabel = {
    [EnrollmentType.Individual]: 'Индивидуально',
    [EnrollmentType.Group]: 'В группе'
};

export const statusOptions = [
    EnrollmentStatus.Processing,
    EnrollmentStatus.Trial,
    EnrollmentStatus.Payment,
    EnrollmentStatus.Active,
    EnrollmentStatus.Completed,
    EnrollmentStatus.Canceled,
    EnrollmentStatus.Postponed
].map(status => ({
    key: status,
    value: status,
    label: StatusLabel[status],
    content: StatusLabel[status],
    icon: StatusIcon[status]
}));

export const typeOptions = [
    { key: 'null', value: '', label: '', content: '' },
    ...Object.entries(TypeLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];