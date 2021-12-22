import {
    Card,
    LayoutGrid
} from 'mdc-react';

import LessonsList from 'shared/components/lessons-list';

import './index.scss';

export default function UnitContent({ course, unit }) {
    const lessons = unit.lessons.map(id => course.lessonsById.get(id));

    return (
        <section className="unit-content">
            <LayoutGrid>
                <LayoutGrid.Cell span="8">
                    {unit.document ?
                        <Card>
                            <iframe
                                src={unit.documentUrl}
                            />
                        </Card>
                        :
                        <Card>
                            {unit.imageUrl &&
                                <Card.Media
                                    imageUrl={unit.imageUrl}
                                    wide
                                />
                            }

                            <Card.Header
                                title={unit.title}
                            />

                            <Card.Section
                                dangerouslySetInnerHTML={{ __html: unit.content }}
                                primary
                            />
                        </Card>
                    }
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="4">
                    <Card>
                        <Card.Header title="Уроки" />

                        <LessonsList
                            unit={unit}
                            lessons={lessons}
                        />
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>
        </section>
    );
}