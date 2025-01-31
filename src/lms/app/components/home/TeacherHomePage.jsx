import { useCallback, useState } from 'react';

import ConfirmationDialog from 'shared/components/confirmation-dialog';
import FormDialog from 'shared/components/form-dialog';
import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { useEnrollments } from 'shared/hooks/enrollments';
import { useLessons } from 'shared/hooks/lessons';
import { useBoolean } from 'shared/hooks/state';
import { useUser } from 'shared/hooks/user';
import { Button, Dialog, Tabs } from 'shared/ui-components';

import EnrollmentDetailsCard from 'lms/components/enrollments/enrollment-details-card';
import EnrollmentsList from 'lms/components/enrollments/enrollments-list';
import LessonDetails from 'lms/components/lessons/lesson-details';
import LessonForm from 'lms/components/lessons/lesson-form';
import LessonsCalendar from 'lms/components/lessons/lessons-calendar';
import LessonsSection from 'lms/components/lessons/lessons-section';

export default function TeacherHomePage() {
    const [user] = useUser();
    const [enrollments] = useEnrollments();
    const [lessons, actions] = useLessons(`teacherId=${user.id}`);

    const [tab, setTab] = useState('calendar');
    const [lesson, setLesson] = useState();
    const [isDialogOpen, toggleDialogOpen] = useBoolean(false);
    const [isFormDialogOpen, toggleFormDialogOpen] = useBoolean(false);
    const [isConfirmationDialogOpen, toggleConfirmationDialogOpen] = useBoolean(false);

    const handleTabChange = useCallback((event, value) => {
        setTab(value);
    }, []);

    const handleLessonClick = useCallback(lesson => {
        setLesson(lesson);
        toggleDialogOpen(true);
    }, []);

    const handleUpdateRequest = useCallback(() => {
        toggleDialogOpen(false);
        toggleFormDialogOpen(true);
    }, []);

    const handleDeleteRequest = useCallback(() => {
        toggleDialogOpen(false);
        toggleConfirmationDialogOpen(true);
    }, []);

    const handleCreateLesson = useCallback(data => {
        data.teacherId = user.id;

        return actions.createLesson(data)
            .finally(() => {
                setLesson();
                toggleFormDialogOpen(false);
            });
    }, [user, actions]);

    const handleUpdateLesson = useCallback(data => {
        if (!lesson) return;

        return actions.updateLesson(lesson.id, data)
            .finally(() => {
                setLesson();
                toggleFormDialogOpen(false);
            });
    }, [actions, lesson]);

    const handleDeleteLesson = useCallback(() => {
        if (!lesson) return;

        return actions.deleteLesson(lesson.id)
            .finally(() => {
                setLesson();
                toggleConfirmationDialogOpen(false);
            });
    }, [actions, lesson]);

    const handleLessonFormClose = useCallback(() => {
        setLesson();
        toggleFormDialogOpen(false);
    }, [toggleFormDialogOpen]);

    if (!lessons) return <LoadingIndicator fullscreen />;

    const activeEnrollments = enrollments?.filter(({ status }) => status === 'active');

    return (
        <Page className="TeacherHomepage HomePage">
            <Page.Header
                title="Главная"
                actions={[{
                    key: 'add',
                    icon: 'add',
                    content: 'Запланировать урок',
                    onClick: toggleFormDialogOpen
                }]}
            />

            <Page.Content>
                {activeEnrollments?.map(enrollment =>
                    <EnrollmentDetailsCard
                        key={enrollment.id}
                        user={user}
                        enrollment={enrollment}
                    />
                )}

                <Tabs
                    value={tab}
                    items={[
                        {
                            key: 'calendar',
                            value: 'calendar',
                            icon: 'calendar_month',
                            content: 'Календарь',
                            color: tab === 'calendar' && 'primary'
                        },
                        {
                            key: 'lessons',
                            value: 'lessons',
                            icon: 'schedule',
                            content: 'Уроки',
                            color: tab === 'lessons' && 'primary'
                        },
                        {
                            key: 'enrollments',
                            value: 'enrollments',
                            content: 'Ученики',
                            icon: 'group',
                            color: tab === 'enrollments' && 'primary'
                        }
                    ]}
                    sx={{
                        marginTop: '2rem'
                    }}
                    onChange={handleTabChange}
                />

                {tab === 'calendar' &&
                    <LessonsCalendar
                        lessons={lessons}
                        onLessonClick={handleLessonClick}
                    />
                }

                {tab === 'lessons' &&
                    <LessonsSection
                        lessons={lessons}
                        onLessonClick={handleLessonClick}
                    />
                }

                {tab === 'enrollments' &&
                    <EnrollmentsList
                        enrollments={enrollments}
                    />
                }
            </Page.Content>

            <FormDialog
                title={lesson ? 'Редактирование урока' : 'Новый урок'}
                open={isFormDialogOpen}
                onClose={handleLessonFormClose}
            >
                <LessonForm
                    id="lesson-form"
                    lesson={lesson}
                    onSubmit={lesson ? handleUpdateLesson : handleCreateLesson}
                />
            </FormDialog>

            <Dialog
                title="Детали урока"
                open={isDialogOpen}
                actions={[
                    <Button
                        key="edit"
                        icon="edit"
                        content="Изменить"
                        variant="soft"
                        color="neutral"
                        onClick={handleUpdateRequest}
                    />,
                    <Button
                        key="delete"
                        icon="delete"
                        content="Удалить"
                        variant="soft"
                        color="danger"
                        onClick={handleDeleteRequest}
                    />
                ]}
                onClose={toggleDialogOpen}
            >
                <LessonDetails
                    lesson={lesson}
                />
            </Dialog>

            <ConfirmationDialog
                title="Удалить урок?"
                message="Урок будет удален без возможности восстановления."
                open={isConfirmationDialogOpen}
                onConfirm={handleDeleteLesson}
                onClose={toggleConfirmationDialogOpen}
            />
        </Page>
    );
}