import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from '@fluentui/react-northstar';

import MaterialIcon from 'shared/components/material-icon';

export default function RequestsList({ requests }) {
    return (
        <List className="requests-list">
            {requests?.map(request =>
                <List.Item
                    key={request.id}
                    as={Link}
                    to={request.url}
                    start={<MaterialIcon icon={request.statusIcon} />}
                    header={`${request.contact.name}`}
                    content={request.contact.phone}
                    endMedia={request.manager &&
                        <Avatar
                            image={request.manager.imageUrl}
                            name={request.manager.fullname}
                        />
                    }
                />
            )}
        </List>
    );
}