import { Link } from 'react-router-dom';

import { Avatar, Icon, List, Status } from 'shared/ui-components';

import './index.scss';

export default function EnrollmentsList({ enrollments }) {
    return (
        <List className="enrollments-list">
            {enrollments.map(enrollment =>
                <List.Item
                    key={enrollment.id}
                    as={Link}
                    to={enrollment.url}
                    //media={<MaterialIcon icon={enrollment.statusIcon} />}
                    media={
                        <Status state="info" />
                    }
                    header={enrollment.domainLabel}
                    content={enrollment.statusLabel}
                    endMedia={enrollment.teacher &&
                        <Avatar
                            name={enrollment.teacher.fullname}
                            title={enrollment.teacher.fullname}
                        />
                    }
                    navigable
                />
            )}
        </List>
    );
}