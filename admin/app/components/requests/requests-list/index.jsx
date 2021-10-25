import { Link } from 'react-router-dom';
import {
    Avatar,
    Icon,
    List
} from 'mdc-react';

export default function RequestsList({ requests }) {
    return (
        <List className="requests-list">
            {requests.map(request =>
                <List.Item
                    key={request.id}
                    component={Link}
                    to={request.url}
                    start={<Icon>{request.statusIcon}</Icon>}
                    primaryText={`${request.contact.name}`}
                    secondaryText={request.contact.phone}
                    end={request.manager &&
                        <Avatar
                            text={request.manager.initials}
                            title={request.manager.fullname}
                        />
                    }
                />
            )}
        </List>
    );
}