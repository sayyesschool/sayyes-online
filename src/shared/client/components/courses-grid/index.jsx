import { Link } from 'react-router-dom';

import { Card, Grid, Heading, Image } from 'shared/ui-components';

export default function CoursesGrid({ courses, ...props }) {
    return (
        <Grid className="CoursesGrid" spacing={2} {...props}>
            {courses?.map(course =>
                <Grid.Item key={course.id} lg={3}>
                    <Card
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
                </Grid.Item>
            )}
        </Grid>
    );
}