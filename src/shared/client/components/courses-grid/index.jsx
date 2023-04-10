import { Link } from 'react-router-dom';

import { Card, Grid, Heading, Image } from 'shared/ui-components';

export default function CoursesGrid({ courses, ...props }) {
    return (
        <Grid className="CoursesGrid" gap="medium" {...props}>
            {courses?.map(course =>
                <Card
                    key={course.id}
                    as={Link}
                    to={{
                        pathname: course.uri,
                        search: course.enrollmentId && `?enrollmentId=${course.enrollmentId}`
                    }}
                >
                    <Card.Overflow>
                        <Image src={course.imageUrl} />
                    </Card.Overflow>

                    <Heading as="h3">{course.title}</Heading>
                </Card>
            )}
        </Grid>
    );
}