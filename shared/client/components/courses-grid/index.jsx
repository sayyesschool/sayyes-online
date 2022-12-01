import { Link } from 'react-router-dom';

import Card from 'shared/ui-components/card';
import Grid from 'shared/ui-components/grid';
import Image from 'shared/ui-components/image';
import Text from 'shared/ui-components/text';

export default function CoursesGrid({ courses }) {
    return (
        <Grid columns="4" className="courses-grid">
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
                        <Text as="h3">{course.title}</Text>
                    </Card.Header>
                </Card>
            )}
        </Grid>
    );
}