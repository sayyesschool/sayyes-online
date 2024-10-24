import PageSection from 'shared/components/page-section';

import LessonsList from 'crm/components/lessons/lessons-list';

export default function TeacherLessons({ teacher }) {
    return (
        <PageSection className="TeacherLessons" title="Уроки" compact>
            {teacher.lessons?.length > 0 &&
                <LessonsList
                    lessons={teacher.lessons}
                />
            }
        </PageSection>
    );
}