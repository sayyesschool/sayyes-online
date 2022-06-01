import { NavLink } from 'react-router-dom';
import { Avatar, List } from '@fluentui/react-northstar';

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