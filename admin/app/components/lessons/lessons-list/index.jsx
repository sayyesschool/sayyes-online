import { Link } from 'react-router-dom';
import { List, Status } from '@fluentui/react-northstar';

import { StatusByType } from 'shared/data/lesson';

export default function LessonsList({ lessons }) {
    return (
        <List className="lessons-list">
            {lessons?.map(lesson =>
                <List.Item
                    key={lesson.id}
                    component={Link}
                    to={lesson.url}
                    media={
                        <Status
                            size="large"
                            state={StatusByType[lesson.status]}
                        />
                    }
                    header="Урок"
                    content={new Date(lesson.date).toLocaleString()}
                    headerMedia={lesson.teacher.fullname}
                    contentMedia={lesson.room?.title}
                />
            )}
        </List>
    );
}