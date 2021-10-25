import { Link } from 'react-router-dom';
import {
    Avatar,
    List
} from 'mdc-react';

export default function StudentList({ students }) {
    return (
        <List>
            {students.map(student =>
                <List.Item
                    component={Link}
                    to={student.url}
                    leadingAvatar={<Avatar text={student.initials} />}
                    primaryText={student.fullname}
                    secondaryText={student.email}
                />
            )}
        </List>
    );
}