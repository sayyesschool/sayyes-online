import {
    Card,
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
                <List>
                    <List.Item
                        icon="person"
                        primaryText={user.fullname}
                        secondaryText="Имя и фамилия"
                    />

                    <List.Item
                        icon="email"
                        primaryText={user.email}
                        secondaryText="Электронная почта"
                    />

                    <List.Item
                        icon="phone"
                        primaryText={user.phone || '[Не указан]'}
                        secondaryText="Телефон"
                        trailingIcon={!user.phone && 'warning'}
                    />

                    <List.Item
                        icon="cake"
                        primaryText={moment(user.dob).format('DD.MM.YYYY')}
                        secondaryText="Дата рождения"
                    />

                    <List.Item
                        icon="public"
                        primaryText={user.timezone || '[Не указан]'}
                        secondaryText="Часовой пояс"
                        trailingIcon={!user.timezone && 'warning'}
                    />
                </List>
            </Card.Section>
        </Card>
    );
}