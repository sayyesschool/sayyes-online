import { Grid, Image, Segment, Text } from '@fluentui/react-northstar';

import LessonsList from 'shared/components/lessons-list';

import './index.scss';

export default function UnitContent({ course, unit }) {
    const lessons = unit.lessons.map(id => course.lessonsById.get(id));

    return (
        <section className="unit-content">
            <Grid>
                {unit.document ?
                    <Segment>
                        <iframe
                            src={unit.documentUrl}
                        />
                    </Segment>
                    :
                    <Segment>
                        {unit.imageUrl &&
                            <Image src={unit.imageUrl} alt="" />
                        }

                        <Text>{unit.title}</Text>

                        <Text dangerouslySetInnerHTML={{ __html: unit.content }} />
                    </Segment>
                }

                <Segment>
                    <Text>Уроки</Text>

                    <LessonsList
                        unit={unit}
                        lessons={lessons}
                    />
                </Segment>
            </Grid>
        </section>
    );
}