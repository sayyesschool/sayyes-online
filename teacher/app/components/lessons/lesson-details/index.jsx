import moment from 'moment';

import { Alert, List, Status } from 'shared/ui-components';
import { StatusByType } from 'shared/data/lesson';

import './index.scss';

export default function LessonDetails({ lesson }) {
    const nowMoment = moment();
    const startMoment = moment(lesson.startAt);
    const nowMinute = nowMoment.minute() || 60;
    const startMinute = startMoment.minute() || 60;
    const isLocked = (
        nowMoment.isSame(startMoment, 'hour') &&
        Math.abs(startMinute - nowMinute) > 8
    );

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

                {lesson.room && <>
                    <List.Item
                        header={lesson.room.title}
                        content="Аудитория"
                        headerMedia={!isLocked && lesson.room.login}
                        contentMedia={!isLocked && lesson.room.password}
                    />

                    {isLocked ?
                        <Alert
                            content="Логин и пароль для входа в аудиторию появятся за 5 мин до урока."
                            warning
                        />
                        :
                        <Alert
                            content="Просьба не задерживаться в аудитории более 5 мин после окончания вашего урока."
                            info
                        />
                    }
                </>}

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