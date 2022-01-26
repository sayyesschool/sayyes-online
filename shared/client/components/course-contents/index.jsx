import { NavLink } from 'react-router-dom';
import { Avatar, List } from 'mdc-react';

export default function CourseContents({ course }) {
    return (
        <div className="course-contents">
            <List>
                {course.units.map((unit, index) =>
                    <List.Item
                        key={unit.id}
                        component={NavLink}
                        to={unit.uri}
                        activeClassName="mdc-list-item--activated"
                        graphic={<Avatar text={index + 1} />}
                        text={unit.title}
                    />
                )}
            </List>
        </div>
    );
}