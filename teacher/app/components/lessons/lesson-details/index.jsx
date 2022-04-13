import { List, Status } from '@fluentui/react-northstar';
import moment from 'moment';

import { StatusByType } from 'shared/data/lesson';

import './index.scss';

export default function LessonDetails({ lesson }) {
    return (
        <section className="lesson-details">
            <List>
                <List.Item
                    header={lesson.statusLabel}
                    content="Статус"
                    endMedia={
                        <Status
                            size="large"
                            state={StatusByType[lesson.status]}
                        />
                    }
                />

                <List.Item
                    header={moment(lesson.date).format('DD.MM.YYYY, HH:mm')}
                    content="Дата и время"
                />

                <List.Item
                    header={`${lesson.duration} мин.`}
                    content="Продолжительность"
                />

                {lesson.room &&
                    <List.Item
                        header={lesson.room.title}
                        headerMedia={lesson.room.login}
                        content="Аудитория"
                        contentMedia={lesson.room.password}
                    />
                }

                {lesson.note &&
                    <List.Item
                        header={lesson.note}
                        content="Заметка"
                    />
                }
            </List>
        </section>
    );
}