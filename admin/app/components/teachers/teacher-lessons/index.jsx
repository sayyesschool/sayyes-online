import PageSection from 'shared/components/page-section';

import LessonsList from 'app/components/lessons/lessons-list';

export default function TeacherLessons({ teacher }) {
    return (
        <PageSection className="teacher-lessons" title="Уроки">
            {teacher.lessons?.length > 0 &&
                <LessonsList
                    lessons={teacher.lessons}
                />
            }
        </PageSection>
    );
}