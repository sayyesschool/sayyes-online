import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, List } from 'mdc-react';

export default function CourseContents({ course }) {
    return (
        <div className="course-contents">
            <List avatarList>
                {course.units.map((unit, index) =>
                    <List.Item
                        component={NavLink}
                        to={`${course.url}/unit/${unit.id}`}
                        activeClassName={'mdc-list-item--activated'}
                        graphic={<Avatar text={index + 1} />}
                        text={unit.title}
                    />
                )}
            </List>
        </div>
    );
}