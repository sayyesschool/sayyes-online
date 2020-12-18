import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    IconButton,
    List
} from 'mdc-react';

export default function EnrollmentCourses({ enrollment, onAdd }) {
    const [isFromOpen, setFormOpen] = useState(false);

    const handleSubmit = useCallback(data => {
        setFormOpen(false);
        onCreate(data);
    }, []);

    return (
        <div className="enrollment-courses">
            <Card outlined>
                <Card.Header
                    title="Курсы"
                    subtitle={(!enrollment.courses || enrollment.courses.length === 0) && 'Курсов пока нет'}
                    actions={
                        <IconButton
                            icon="add"
                            onClick={onAdd}
                        />
                    }
                />

                {enrollment.courses &&
                    <Card.Section>
                        <List twoLine imageList>
                            {enrollment.courses?.map(course =>
                                <List.Item
                                    key={course.id}
                                    component={Link}
                                    to={course.uri}
                                    graphic={<img src={course.imageUrl} />}
                                    primaryText={course.title}
                                    secondaryText={`${course.units.length} юнитов`}
                                />
                            )}
                        </List>
                    </Card.Section>
                }
            </Card>
        </div>
    );
}