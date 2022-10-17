import { Link } from 'react-router-dom';

import { List } from 'shared/ui-components';

export default function ManagersList({ managers }) {
    return (
        <List className="managers-list">
            {managers.map(manager =>
                <List.Item
                    key={manager.id}
                    component={Link}
                    to={manager.url}
                    header={manager.fullname}
                    content={manager.email}
                    contentMedia={manager.phone}
                />
            )}
        </List>
    );
}