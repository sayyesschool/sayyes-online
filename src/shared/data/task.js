import { DuePeriod, Priority, Status, Topic } from 'core/models/task/constants';

export const defaultFilters = {
    topic: '',
    priority: '',
    assigneeId: '',
    due: '',
    status: ''
};

export const DuePeriodLabel = {
    [DuePeriod.Today]: 'Сегодня',
    [DuePeriod.Week]: 'На этой неделе',
    [DuePeriod.None]: 'Без срока',
    [DuePeriod.Overdue]: 'Просроченные'
};

export const duePeriodOptions = [
    ...Object.entries(DuePeriodLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

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

export const priorityOptions = [
    ...Object.entries(PriorityLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const TopicLabel = {
    [Topic.Hiring]: 'Найм',
    [Topic.Payment]: 'Оплата',
    [Topic.Relevance]: 'Актуальность',
    [Topic.Trial]: 'Пробный урок'
};

export const topicOptions = [
    ...Object.entries(TopicLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];

export const StatusLabel = {
    [Status.Open]: 'Открыта',
    [Status.Completed]: 'Выполнена'
};

export const statusOptions = [
    ...Object.entries(StatusLabel).map(([key, value]) => ({
        key,
        value: key,
        label: value,
        content: value
    }))
];