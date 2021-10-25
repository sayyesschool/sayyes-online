import { Link } from 'react-router-dom';
import {
    Card,
    LayoutGrid
} from 'mdc-react';

export default function CoursesGrid({ courses }) {
    return (
        <LayoutGrid className="courses-grid">
            {courses.map(course =>
                <LayoutGrid.Cell key={course.id} span="4">
                    <Card>
                        <Card.PrimaryAction
                            component={Link}
                            to={course.uri}
                        >
                            <Card.Media
                                imageUrl={course.imageUrl}
                                wide
                            />

                            <Card.Header
                                title={course.title}
                                subtitle={course.subtitle}
                            />
                        </Card.PrimaryAction>
                    </Card>
                </LayoutGrid.Cell>
            )}
        </LayoutGrid>
    );
}