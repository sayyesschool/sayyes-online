import { Link } from 'react-router-dom';

import { Avatar, List, Status } from 'shared/ui-components';
import { StatusByType } from 'shared/data/lesson';

export default function RequestsList({ requests }) {
    return (
        <List className="requests-list">
            {requests?.map(request =>
                <List.Item
                    key={request.id}
                    as={Link}
                    to={request.url}
                    media={
                        <Status
                            size="large"
                            state={StatusByType[request.status]}
                        />
                    }
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