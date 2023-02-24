import { NavLink } from 'react-router-dom';

import Avatar from 'shared/ui-components/avatar';
import List from 'shared/ui-components/list';

export default function UnitsList({ units }) {
    return (
        <div className="units-list">
            <List>
                {units.map((unit, index) =>
                    <List.Item
                        key={unit.id}
                        as={NavLink}
                        to={unit.uri}
                        activeClassName="mdc-list-item--activated"
                        graphic={<Avatar text={index + 1} />}
                        header={unit.title}
                    />
                )}
            </List>
        </div>
    );
}