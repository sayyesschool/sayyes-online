import { Button, Flex, Grid, MenuButton } from '@fluentui/react-northstar';

import { useEnrollment } from 'shared/hooks/enrollments';
import Icon from 'shared/ui-components/icon';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';

import EnrollmentCourses from 'app/components/enrollments/enrollment-courses';
import EnrollmentLessons from 'app/components/enrollments/enrollment-lessons';
import EnrollmentManagers from 'app/components/enrollments/enrollment-managers';
import EnrollmentMaterials from 'app/components/enrollments/enrollment-materials';
import EnrollmentPosts from 'app/components/enrollments/enrollment-posts';
import EnrollmentSchedule from 'app/components/enrollments/enrollment-schedule';
import EnrollmentTeachers from 'app/components/enrollments/enrollment-teachers';

import './index.scss';

export default function EnrollmentPage({ match }) {
    const [enrollment] = useEnrollment(match.params.id);

    if (!enrollment) return <LoadingIndicator />;

    return (
        <Page id="enrollment-page">
            <PageHeader
                title={enrollment.domainLabel}
                actions={[
                    <Button
                        key="class"
                        as="a"
                        href={enrollment.classUrl}
                        icon={<Icon>video_call</Icon>}
                        content="Перейти в класс"
                        primary
                    />,
                    (enrollment.teachers[0]?.zoomUrl &&
                        <MenuButton
                            key="menu"
                            trigger={
                                <Button
                                    icon={<Icon>more_vert</Icon>}
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

            </PageHeader>

            <PageContent>
                <Grid columns="minmax(0, 2fr) minmax(0, 1fr)">
                    <Flex>
                        <EnrollmentPosts
                            enrollment={enrollment}
                        />
                    </Flex>

                    <Flex column>
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
                </Grid>
            </PageContent>
        </Page>
    );
}