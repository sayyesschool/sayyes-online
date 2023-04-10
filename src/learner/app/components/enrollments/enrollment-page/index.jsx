import { useEnrollment } from 'shared/hooks/enrollments';
import { Button, Flex, Grid, MenuButton } from 'shared/ui-components';
import EnrollmentPosts from 'shared/components/enrollment-posts';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';

import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentManagers from 'app/components/enrollments/enrollment-managers';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import EnrollmentTeachers from 'app/components/enrollments/enrollment-teachers';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page className="EnrollmentPage">
            <Page.Header
                title={enrollment.domainLabel}
                actions={[
                    <Button
                        key="class"
                        as="a"
                        href={enrollment.classUrl}
                        icon="video_call"
                        content="Перейти в класс"
                    />,
                    (enrollment.teachers[0]?.zoomUrl &&
                        <MenuButton
                            key="menu"
                            trigger={
                                <Button
                                    icon="more_vert"
                                    iconOnly
                                    text
                                />
                            }
                            menu={[
                                {
                                    key: 'zoom',
                                    element: 'a',
                                    href: enrollment.teacher.zoomUrl,
                                    target: '_blank',
                                    content: 'Подключиться в Zoom'
                                }
                            ]}
                        />
                    )
                ]}
            >

            </Page.Header>

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item lg={8}>
                        <EnrollmentPosts
                            enrollment={enrollment}
                        />
                    </Grid.Item>

                    <Grid.Item lg={4}>
                        <Flex gap="medium" column>
                            <EnrollmentLessons
                                enrollment={enrollment}
                            />

                            <EnrollmentSchedule
                                enrollment={enrollment}
                            />

                            <EnrollmentTeachers
                                enrollment={enrollment}
                            />

                            <EnrollmentManagers
                                enrollment={enrollment}
                            />

                            {enrollment.courses?.length > 0 &&
                                <EnrollmentCourses
                                    enrollment={enrollment}
                                />
                            }

                            {enrollment.materials?.length > 0 &&
                                <EnrollmentMaterials
                                    enrollment={enrollment}
                                />
                            }
                        </Flex>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}