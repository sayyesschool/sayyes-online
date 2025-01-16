import { Link } from 'react-router-dom';

import ConfirmButton from '@/shared/components/confirm-button';
import CopyButton from '@/shared/components/copy-button';
import {
    ButtonGroup,
    IconButton,
    List,
    Text } from 'shared/ui-components';

import styles from './MeetingRegistrationsList.module.scss';

export default function MeetingRegistrationsList({
    meeting,
    registrations,
    onUpdate,
    onDelete
}) {
    return (
        <List>
            {registrations?.map(registration =>
                <List.Item
                    key={registration.id}
                    className={styles.item}
                    icon={getRegistrationIcon(registration)}
                    content={
                        <Link to={`/learners/${registration.userId}`}>
                            <Text type="body-md">{`${registration.user?.firstname} ${registration.user?.lastname}`}</Text>
                            <Text type="body-sm">{registration.user?.email}</Text>
                        </Link>
                    }
                    end={<>
                        {meeting.isScheduled || meeting.isStarted && registration.joinUrl &&
                            <CopyButton
                                title="Копировать ссылку для входа"
                                icon="link"
                                copyContent={registration.joinUrl}
                            />
                        }

                        {registration.isPending &&
                            <IconButton
                                title="Подтвердить"
                                icon="check"
                                onClick={() => onUpdate(registration, { status: 'approved' })}
                            />
                        }

                        {registration.isPending &&
                            <IconButton
                                title="Отменить"
                                icon="cancel"
                                onClick={() => onUpdate(registration, { status: 'canceled' })}
                            />
                        }

                        {meeting.isEnded &&
                            <ButtonGroup variant="plain" spacing="4px">
                                <IconButton
                                    title="Отметить как присутствующего"
                                    value="attended"
                                    icon="person_check"
                                    color={registration.isAttended ? 'success' : undefined}
                                    variant={registration.isAttended ? 'soft' : undefined}
                                    onClick={() => onUpdate(registration, { status: 'attended' })}
                                />

                                <IconButton
                                    title="Отметить как отсутствующего"
                                    value="missed"
                                    icon="person_remove"
                                    color={registration.isMissed ? 'danger' : undefined}
                                    variant={registration.isMissed ? 'soft' : undefined}
                                    onClick={() => onUpdate(registration, { status: 'missed' })}
                                />
                            </ButtonGroup>
                        }

                        <ConfirmButton
                            title="Удалить"
                            message="Вы уверены, что хотите удалить регистрацию?"
                            description="Это действие нельзя отменить"
                            icon="delete"
                            color="danger"
                            onConfirm={() => onDelete(registration)}
                        />
                    </>}
                />
            )}
        </List>
    );
}

function getRegistrationIcon(registration) {
    if (registration.status === 'canceled')
        return 'cancel';
    else if (registration.participated)
        return 'check_circle';
    else
        return 'radio_button_unchecked';
}