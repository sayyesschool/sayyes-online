import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

import { useBoolean } from 'shared/hooks/state';
import ProfileForm from 'app/components/account/profile-form';

export default function ProfileCard({ user }) {
    const [isEditing, toggleEditing] = useBoolean(false);

    return (
        <Card outlined>
            <Card.Header
                title="Профиль"
                actions={isEditing ?
                    [
                        <IconButton
                            key="save"
                            icon="save"
                            onClick={toggleEditing}
                        />,
                        <IconButton
                            key="close"
                            icon="close"
                            onClick={toggleEditing}
                        />
                    ]
                    :
                    <IconButton
                        icon="edit"
                        onClick={toggleEditing}
                    />
                }
            />

            {isEditing ?
                <Card.Section primary>
                    <ProfileForm
                        profile={user}
                    />
                </Card.Section>
                :
                <Card.Section>
                    <List twoLine>
                        <List.Item
                            graphic={<Icon>person</Icon>}
                            primaryText={user.fullname}
                            secondaryText="Имя и фамилия"
                        />

                        <List.Item
                            graphic={<Icon>email</Icon>}
                            primaryText={user.email}
                            secondaryText="Электронная почта"
                        />

                        <List.Item
                            graphic={<Icon>phone</Icon>}
                            primaryText={user.phone || '[Не указан]'}
                            secondaryText="Телефон"
                            meta={!user.phone && <Icon>warning</Icon>}
                        />

                        <List.Item
                            graphic={<Icon>cake</Icon>}
                            primaryText={moment(user.dob).format('DD.MM.YYYY')}
                            secondaryText="Дата рождения"
                        />

                        <List.Item
                            graphic={<Icon>public</Icon>}
                            primaryText={user.timezone || '[Не указан]'}
                            secondaryText="Часовой пояс"
                            meta={!user.timezone && <Icon>warning</Icon>}
                        />
                    </List>
                </Card.Section>
            }
        </Card>
    );
}