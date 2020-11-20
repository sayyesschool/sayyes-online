import React from 'react';
import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

export default function StudentList({ students }) {
    return (
        <List twoLine avatarList>
            {students.map(student =>
                <List.Item
                    component={Link}
                    to={student.url}
                    graphic={<Avatar text={student.initials} />}
                    primaryText={student.fullname}
                    secondaryText={student.email}
                />
            )}
        </List>
    );
}