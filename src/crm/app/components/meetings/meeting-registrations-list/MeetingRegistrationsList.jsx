import { Link } from 'react-router-dom';

import ConfirmButton from '@/shared/components/confirm-button';
import CopyButton from '@/shared/components/copy-button';
import {
    IconButton,
    List,
    Text
} from 'shared/ui-components';

import styles from './MeetingRegistrationsList.module.scss';

export default function MeetingRegistrationsList({
    registrations,
    onConfirm,
    onCancel,
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
                        {registration.joinUrl &&
                            <CopyButton
                                title="Копировать ссылку для входа"
                                icon="link"
                                copyContent={registration.joinUrl}
                            />
                        }

                        {registration.status !== 'approved' &&
                            <IconButton
                                title="Подтвердить"
                                icon="check"
                                onClick={() => onConfirm(registration)}
                            />
                        }

                        {registration.status !== 'canceled' &&
                            <IconButton
                                title="Отменить"
                                icon="cancel"
                                onClick={() => onCancel(registration)}
                            />
                        }

                        <ConfirmButton
                            title="Удалить"
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