import { RegistrationStatus } from 'core/models/registration/constants';

export const StatusIcon = {
    [RegistrationStatus.Pending]: 'pending',
    [RegistrationStatus.Approved]: 'preliminary',
    [RegistrationStatus.Denied]: 'block',
    [RegistrationStatus.Canceled]: 'cancel',
    [RegistrationStatus.Attended]: 'check_circle',
    [RegistrationStatus.Missed]: 'do_not_disturb_on'
};

export const StatusColor = {
    [RegistrationStatus.Pending]: 'primary',
    [RegistrationStatus.Approved]: 'warning',
    [RegistrationStatus.Denied]: 'danger',
    [RegistrationStatus.Canceled]: 'danger',
    [RegistrationStatus.Attended]: 'success',
    [RegistrationStatus.Missed]: 'neutral'
};

export const StatusLabel = {
    [RegistrationStatus.Pending]: 'Ожидание',
    [RegistrationStatus.Approved]: 'Подтверждено',
    [RegistrationStatus.Denied]: 'Отклонено',
    [RegistrationStatus.Canceled]: 'Отменено',
    [RegistrationStatus.Attended]: 'Посещено',
    [RegistrationStatus.Missed]: 'Пропущено'
};

export const statusOptions = Object.entries(StatusLabel).map(([key, value]) => ({
    key,
    value: key,
    label: value,
    content: value
}));