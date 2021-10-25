import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

export default function MeetingList({ meetings }) {
    return (
        <List className="meeting-list">
            {meetings.map(meeting =>
                <List.Item
                    key={meeting.id}
                    component={Link}
                    to={meeting.url}
                    primaryText={meeting.title}
                    secondaryText={meeting.datetime}
                    end={meeting.host &&
                        <Avatar text={meeting.host.initials} title={meeting.host.fullname} />
                    }
                />
            )}
        </List>
    );
}