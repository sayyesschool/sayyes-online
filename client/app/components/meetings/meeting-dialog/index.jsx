import React from 'react';
import {
    Avatar,
    Button,
    ChipSet, Chip,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Icon,
    Typography
} from 'mdc-react';

import './index.scss';

export default function MeetingDialog({ meeting = { host: {}, level: '' }, onRegister, onClose, ...props }) {
    return (
        <Dialog
            id="meeting-dialog"
            onClose={onClose}
            {...props}
        >
            <img src={meeting.thumbnailUrl} />

            <DialogTitle>{meeting.title}</DialogTitle>

            <DialogContent>
                <Typography>{meeting.datetime} Мск</Typography>

                <ChipSet>
                    <Chip
                        className={`meeting-level meeting-level--${meeting.level.toLowerCase()}`}
                        leadingIcon={<Icon>star</Icon>}
                        text={meeting.level}
                    />

                    <Chip
                        className="meeting-host"
                        leadingIcon={meeting.host.avatarUrl ? <Avatar src={meeting.host.avatarUrl} /> : <Icon>person</Icon>}
                        text={meeting.host.fullname}
                    />
                </ChipSet>

                <Typography>{meeting.description}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Закрыть</Button>

                <Button
                    outlined
                    onClick={() => onRegister(meeting)}
                >
                    {meeting.isRegistered ? 'Отменить запись' : 'Зарегистрироваться'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}