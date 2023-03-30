import PageSection from 'shared/components/page-section';

import LessonsList from 'app/components/lessons/lessons-list';

export default function TeacherLessons({ teacher }) {
    return (
        <PageSection className="sy-TeacherLessons" title="Уроки" compact>
            {teacher.lessons?.length > 0 &&
                <LessonsList
                    lessons={teacher.lessons}
                />
            }
        </PageSection>
    );
}