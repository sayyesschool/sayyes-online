import StatusChip from 'shared/components/status-chip';
import { Alert, List, Text } from 'shared/ui-components';
import datetime from 'shared/libs/datetime';

import './index.scss';

export default function LessonDetails({ lesson }) {
    const nowMoment = datetime();
    const startMoment = datetime(lesson.startAt);
    const nowMinute = nowMoment.minute() || 60;
    const startMinute = startMoment.minute() || 60;
    const isLocked = (
        nowMoment.isSame(startMoment, 'hour') &&
        Math.abs(startMinute - nowMinute) > 8
    );

    return (
        <section className="LessonDetails">
            <List>
                <List.Item
                    header={lesson.statusLabel}
                    content="Статус"
                    end={
                        <StatusChip
                            status={lesson.status}
                        />
                    }
                />

                <List.Item
                    content={<>
                        <Text type="body2">Дата и время</Text>
                        <Text type="body1">{datetime(lesson.date).format('DD.MM.YYYY, HH:mm')}</Text>
                    </>}
                />

                <List.Item
                    content={<>
                        <Text type="body2">Продолжительность</Text>
                        <Text type="body1">{lesson.duration} мин.</Text>
                    </>}
                />

                {lesson.room && <>
                    <List.Item
                        content={<>
                            <Text type="body2">Аудитория</Text>
                            <Text type="body1">{lesson.room.title}</Text>
                        </>}
                        end={<div>
                            <Text type="body2">{lesson.room.login}</Text>
                            <Text type="body2">{lesson.room.password}</Text>
                        </div>}
                    />

                    {isLocked ?
                        <Alert
                            content="Логин и пароль для входа в аудиторию появятся за 5 мин до урока."
                            color="warning"
                        />
                        :
                        <Alert
                            content="Просьба не задерживаться в аудитории более 5 мин после окончания вашего урока."
                            color="info"
                        />
                    }
                </>}

                {lesson.note &&
                    <List.Item
                        content={<>
                            <Text type="body2">Заметка</Text>
                            <Text type="body1">{lesson.note}</Text>
                        </>}
                    />
                }
            </List>
        </section>
    );
}