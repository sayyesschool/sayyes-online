import React from 'react';
import {
    Card,
    Icon,
    IconButton,
    List
} from 'mdc-react';
import moment from 'moment';

export default function ProfileCard({ user }) {
    return (
        <Card outlined>
            <Card.Header
                title="Профиль"
                actions={
                    <IconButton
                        icon="edit"
                        onClick={() => setProfileDialogOpen(true)}
                    />
                }
            />

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
        </Card>
    );
}