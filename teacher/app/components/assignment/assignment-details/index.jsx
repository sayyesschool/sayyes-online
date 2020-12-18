import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    Icon,
    IconButton,
    List,
    LayoutGrid,
    Typography
} from 'mdc-react';

import FormDialog from 'shared/components/form-dialog';
import PostForm from 'shared/components/post-form';
import CourseCard from 'shared/components/course-card';

import './index.scss';

export default function EnrollmentDetails({ assignment, onCreateLesson, onCreateAssignment, onCreatePost }) {
    const [isPostFromOpen, setPostFormOpen] = useState(false);

    const handlePostFromSubmit = useCallback(data => {
        onCreatePost(data);
        setPostFormOpen(false);
    }, []);

    return (
        <div className="assignment-details">
            <LayoutGrid>
                <LayoutGrid.Cell span="3">
                    <Card outlined>
                        <Card.Header
                            title="Курсы"
                            subtitle={(!enrollment.courses || enrollment.courses.length === 0) && 'Курсов пока нет'}
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={onCreatePost}
                                />
                            }
                        />

                        {enrollment.courses &&
                            <Card.Section>
                                <List twoLine imageList>
                                    {enrollment.courses?.map(course =>
                                        <List.Item
                                            key={course.id}
                                            graphic={<img src={course.imageUrl} />}
                                            primaryText={course.title}
                                            secondaryText={`${course.units.length} юнитов`}
                                        />
                                    )}
                                </List>
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card outlined>
                        <Card.Header
                            title="Предстоящие занятия"
                            subtitle={(!enrollment.lessons || enrollment.lessons.length === 0) && 'Занятий пока нет'}
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={onCreatePost}
                                />
                            }
                        />

                        {enrollment.lessons &&
                            <Card.Section>
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
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card outlined>
                        <Card.Header
                            title="Домашние задания"
                            subtitle={(!enrollment.assignments || enrollment.assignments.length === 0) && 'Заданий пока нет'}
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={onCreatePost}
                                />
                            }
                        />

                        {enrollment.assignments &&
                            <Card.Section>
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
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card outlined>
                        <Card.Header
                            title="Прогресс обучения"
                            subtitle={(!enrollment.posts || enrollment.posts.length === 0) && 'Отчетов пока нет'}
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={() => setPostFormOpen(true)}
                                />
                            }
                        />

                        {enrollment.posts &&
                            <Card.Section>
                                <List twoLine>
                                    {enrollment.posts?.map(post =>
                                        <List.Item
                                            key={post.id}
                                            component={Link}
                                            to={post.url}
                                            primaryText={post.title}
                                            secondaryText={post.publishedAt}
                                        />
                                    )}
                                </List>
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>

                <LayoutGrid.Cell span="3">
                    <Card outlined>
                        <Card.Header
                            title="Дополнительные материалы"
                            subtitle={(!enrollment.materials || enrollment.materials.length === 0) && 'Отчетов пока нет'}
                            actions={
                                <IconButton
                                    icon="add"
                                    onClick={() => setPostFormOpen(true)}
                                />
                            }
                        />

                        {enrollment.materials &&
                            <Card.Section>
                                <List thumbnailList>
                                    {enrollment.materials?.map(material =>
                                        <List.Item
                                            key={material.id}
                                            component={Link}
                                            to={material.url}
                                            graphic={<img src={material.imageUrl} />}
                                            text={material.title}
                                        />
                                    )}
                                </List>
                            </Card.Section>
                        }
                    </Card>
                </LayoutGrid.Cell>
            </LayoutGrid>

            <FormDialog
                form="post-form"
                title="Новая запись"
                className="post-dialog"
                open={isPostFromOpen}
                onClose={() => setPostFormOpen(false)}
            >
                <PostForm
                    onSubmit={handlePostFromSubmit}
                />
            </FormDialog>
        </div>
    );
}