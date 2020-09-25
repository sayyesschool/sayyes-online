import React from 'react';
import { NavLink } from 'react-router-dom';
import { List } from 'mdc-react';

export default function CourseContents({ course }) {
    return (
        <div className="course-contents">
            <List>
                {course.units.map(unit =>
                    <List.Item
                        text={unit.title}
                    />
                )}
            </List>
        </div>
    );
}