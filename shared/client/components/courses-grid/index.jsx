import { Link } from 'react-router-dom';
import { Card, Grid, Image, Text } from '@fluentui/react-northstar';

export default function CoursesGrid({ courses }) {
    return (
        <Grid className="courses-grid">
            {courses.map(course =>
                <Card
                    key={course.id}
                    as={Link}
                    to={course.uri}
                >
                    <Card.Preview>
                        <Image
                            src={course.imageUrl}
                            alt=""
                        />
                    </Card.Preview>


                    <Card.Header>
                        <Text>{course.title}</Text>
                        <Text>{course.subtitle}</Text>
                    </Card.Header>
                </Card>
            )}
        </Grid>
    );
}