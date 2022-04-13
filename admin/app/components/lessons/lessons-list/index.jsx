import { Link } from 'react-router-dom';
import { Image, List, Status } from '@fluentui/react-northstar';

import { StatusByType } from 'shared/data/lesson';

export default function LessonsList({ lessons }) {
    return (
        <List className="lessons-list">
            {lessons?.map(lesson =>
                <List.Item
                    key={lesson.id}
                    component={Link}
                    to={lesson.url}
                    media={lesson.teacher.imageUrl ?
                        <Image
                            image={lesson.teacher.imageUrl}
                        />
                        :
                        lesson.teacher.initials
                    }
                    header="Урок"
                    content={new Date(lesson.date).toLocaleString()}
                    endMedia={
                        <Status
                            size="large"
                            state={StatusByType[lesson.status]}
                        />
                    }
                />
            )}
        </List>
    );
}