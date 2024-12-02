import { useContext } from 'react';
import { Link } from 'react-router-dom';

import ConfirmButton from '@/shared/components/confirm-button/ConfirmButton';
import {
    IconButton,
    List,
    Text
} from 'shared/ui-components';

import UIContext from 'crm/contexts/ui';

import styles from './MeetingRegistrationsList.module.scss';

export default function MeetingRegistrationsList({ registrations, onConfirm, onCancel, onDelete }) {
    const UI = useContext(UIContext);

    function handleCopyButtonClick(value) {
        navigator.clipboard.writeText(value);
        UI.showNotification('Ссылка скопирована');
    }

    return (
        <List>
            {registrations?.map(registration =>
                <List.Item
                    key={registration.id}
                    className={styles.item}
                    icon={getRegistrationIcon(registration)}
                    content={
                        <Link to={`/learners/${registration.userId}`}>
                            <Text type="body-md">{`${registration.registrant.firstname} ${registration.registrant.lastname}`}</Text>
                            <Text type="body-sm">{registration.registrant.email}</Text>
                        </Link>
                    }
                    end={<>
                        {registration.joinUrl &&
                            <IconButton
                                title="Копировать ссылку для входа"
                                icon="link"
                                onClick={() => handleCopyButtonClick(registration.joinUrl)}
                            />
                        }

                        {registration.status !== 'confirmed' &&
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
                                onConfirm={() => onCancel(registration)}
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