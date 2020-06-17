import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card, CardHeader, CardActions, CardAction,
    Icon,
    LayoutGrid, LayoutGridCell,
    List, ListItem, ListItemText, ListItemGraphic,
    Typography
} from 'mdc-react';

import { useStore } from 'shared/hooks/store';
import { actionCreators } from 'app/store/modules/account';
import ProfileDialogForm from 'app/components/account/profile-dialog-form';
import PasswordDialogForm from 'app/components/account/password-dialog-form';

export default function AccountPage() {
    const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
    const [isPasswordDialogOpen, setPasswordDialogOpen] = useState(false);

    const [{ account, tickets, meetings }, actions] = useStore(state => ({
        account: state.account,
        tickets: state.tickets,
        meetings: state.meetings.filter(meeting => meeting.hasParticipated)
    }), actionCreators);

    const handleProfileFormSubmit = useCallback(data => {
        actions.updateProfile(data)
            .then(() => setProfileDialogOpen(false));
    }, []);

    const handlePasswordFormSubmit = useCallback(data => {
        actions.updatePassword(data)
            .then(() => setPasswordDialogOpen(false));
    }, []);

    return (
        <main id="account-page" className="page">
            <Button
                element={Link}
                to="/"
                icon={<Icon>arrow_back</Icon>}
                label="Вернуться"
            />

            <Typography element="h1" variant="headline4">Мой аккаунт</Typography>

            <LayoutGrid>
                <LayoutGridCell span="12">
                    <Typography element="h2" variant="headline5">Профиль</Typography>

                    <Card outlined>
                        <CardHeader
                            title={account.fullname}
                            subtitle={account.email}
                        />

                        <CardActions>
                            <CardAction button>
                                <Button onClick={() => setProfileDialogOpen(true)}>Редактировать профиль</Button>
                            </CardAction>

                            <CardAction button>
                                <Button onClick={() => setPasswordDialogOpen(true)}>Изменить пароль</Button>
                            </CardAction>
                        </CardActions>
                    </Card>
                </LayoutGridCell>

                <LayoutGridCell span="12">
                    <Typography element="h2" variant="headline5">Билеты</Typography>

                    {tickets.length > 0 ?
                        <Card outlined>
                            <List twoLine nonInteractive>
                                {tickets.map(ticket =>
                                    <ListItem key={ticket.id}>
                                        <ListItemGraphic>
                                            <Icon>confirmation_number</Icon>
                                        </ListItemGraphic>

                                        <ListItemText
                                            primary={ticket.title}
                                            secondary={ticket.meeting ? ticket.meeting.title : 'Не использован'}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Card>
                        :
                        <Typography>Вы еще не приобрели ни один билет.</Typography>
                    }
                </LayoutGridCell>

                <LayoutGridCell span="12">
                    <Typography element="h2" variant="headline5">Встречи</Typography>

                    {meetings.length > 0 ?
                        <Card outlined>
                            <List twoLine nonInteractive>
                                {meetings.map(meeting =>
                                    <ListItem key={meeting.id}>
                                        <ListItemGraphic>
                                            <Icon>people</Icon>
                                        </ListItemGraphic>

                                        <ListItemText
                                            primary={meeting.title}
                                            secondary={meeting.datetime}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Card>
                        :
                        <Typography>Вы еще не участвовали ни в одной встрече.</Typography>
                    }
                </LayoutGridCell>
            </LayoutGrid>

            <ProfileDialogForm
                open={isProfileDialogOpen}
                profile={account}
                onClose={() => setProfileDialogOpen(false)}
                onSubmit={handleProfileFormSubmit}
            />

            <PasswordDialogForm
                open={isPasswordDialogOpen}
                onClose={() => setPasswordDialogOpen(false)}
                onSubmit={handlePasswordFormSubmit}
            />
        </main>
    );
}