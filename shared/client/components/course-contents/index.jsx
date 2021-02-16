import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, List } from 'mdc-react';

export default function CourseContents({ enrollment, course }) {
    return (
        <div className="course-contents">
            <List avatarList>
                {course.units.map((unit, index) =>
                    <List.Item
                        component={NavLink}
                        to={enrollment.url + unit.uri}
                        activeClassName={'mdc-list-item--activated'}
                        graphic={<Avatar text={index + 1} />}
                        text={unit.title}
                    />
                )}
            </List>
        </div>
    );
}