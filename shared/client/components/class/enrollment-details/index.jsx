import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    List,
    LayoutGrid,
    Typography
} from 'mdc-react';

import CourseCard from 'shared/components/class/course-card';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <div className="enrollment-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="3">
                    <Typography type="headline6">Курсы</Typography>

                    {enrollment.courses.map(course =>
                        <CourseCard
                            component={Link}
                            to={`/class/${enrollment.id}/course/${course.id}`}
                            key={course.id}
                            course={course}
                        />
                    )}
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Typography type="headline6">Предстоящие занятия</Typography>

                    {enrollment.lessons ?
                        <Card outlined>
                            <List twoLine>
                                {enrollment.lessons?.map(lesson =>
                                    <List.Item
                                        key={lesson.id}
                                        graphic={<Icon>{lesson.statusIcon}</Icon>}
                                        primaryText={lesson.datetime}
                                        secondaryText={lesson.statusLabel}
                                    />
                                )}
                            </List>
                        </Card>
                        :
                        <Typography noMargin>Занятий пока нет</Typography>
                    }

                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Typography type="headline6">Домашние задания</Typography>

                    {enrollment.assignments ?
                        <Card outlined>
                            <List twoLine>
                                {enrollment.assignments?.map(assignment =>
                                    <List.Item
                                        key={lesson.id}
                                        graphic={<Icon>{lesson.statusIcon}</Icon>}
                                        primaryText={lesson.datetime}
                                        secondaryText={lesson.statusLabel}
                                        disabled
                                    />
                                )}
                            </List>
                        </Card>
                        :
                        <Typography noMargin>Заданий пока нет</Typography>
                    }

                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Typography type="headline6">Прогресс обучения</Typography>

                    {enrollment.reports ?
                        <Card outlined>

                            <List twoLine>
                                {enrollment.reports?.map(report =>
                                    <List.Item
                                        key={report.id}
                                        graphic={<Icon>{report.statusIcon}</Icon>}
                                        primaryText={report.datetime}
                                        secondaryText={report.statusLabel}
                                    />
                                )}
                            </List>
                        </Card>
                        :
                        <Typography noMargin>Отчетов пока нет</Typography>
                    }
                </LayoutGrid.Cell>

                {enrollment.materials.length > 0 &&
                    <LayoutGrid.Cell span="3">
                        <Typography type="headline6">Дополнительные материалы</Typography>

                        <Card outlined>
                            <List>
                                {enrollment.materials?.map(material =>
                                    <List.Item
                                        key={material.id}
                                        component={Link}
                                        to={material.url}
                                        text={material.title}
                                    />
                                )}
                            </List>
                        </Card>
                    </LayoutGrid.Cell>
                }
            </LayoutGrid>
        </div>
    );
}