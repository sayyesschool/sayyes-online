import { useEnrollment } from 'shared/hooks/enrollments';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { Button, Flex, Grid, MenuButton } from 'shared/ui-components';

import EnrollmentClient from 'app/components/enrollments/enrollment-client';
import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentDetails from 'app/components/enrollments/enrollment-details';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPosts from 'app/components/enrollments/enrollment-posts';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page className="EnrollmentPage">
            <Page.Header
                title={enrollment.domainLabel}
                breadcrumbs={[{ content: enrollment.client.fullname }]}
                actions={[
                    <Button
                        key="class"
                        as="a"
                        href={enrollment.classUrl}
                        icon="video_call"
                        content="Перейти в класс"
                        primary
                    />,
                    (enrollment.teachers[0]?.zoomUrl &&
                        <MenuButton
                            key="menu"
                            trigger={
                                <IconButton
                                    icon="more_vert"
                                    color="neutral"
                                    size="sm"
                                    variant="plain"
                                />
                            }
                            items={[
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
            />

            <Page.Content>
                <Grid spacing={2}>
                    <Grid.Item lg={8}>
                        <EnrollmentPosts
                            enrollment={enrollment}
                        />
                    </Grid.Item>

                    <Grid.Item lg={4}>
                        <Flex gap="medium" column>
                            <EnrollmentClient
                                client={enrollment.client}
                            />

                            <EnrollmentDetails
                                enrollment={enrollment}
                            />

                            <EnrollmentSchedule
                                enrollment={enrollment}
                            />

                            <EnrollmentLessons
                                enrollment={enrollment}
                            />

                            <EnrollmentCourses
                                enrollment={enrollment}
                            />

                            <EnrollmentMaterials
                                enrollment={enrollment}
                            />
                        </Flex>
                    </Grid.Item>
                </Grid>
            </Page.Content>
        </Page>
    );
}