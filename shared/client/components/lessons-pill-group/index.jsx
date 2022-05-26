import { Pill, PillGroup } from '@fluentui/react-northstar';
import classnames from 'classnames';
import moment from 'moment';

import Icon from 'shared/components/icon';

import './index.scss';

export default function LessonPillGroup({
    lessons,
    onClick = Function.prototype,
    onDelete
}) {
    return (
        <PillGroup className="lessons-pill-group">
            {lessons.map(lesson => ({ ...lesson, date: moment(lesson.date) })).map(lesson =>
                <Pill
                    key={lesson.id || lesson.date.valueOf()}
                    className={classnames('lesson-pill', `lesson-pill--${lesson.status}`)}
                    icon={<Icon>{lesson.trial && 'tour'}</Icon>}
                    content={<>
                        <span>
                            <span className="lesson-date">{lesson.date.format('D.M')}</span>
                            <span className="lesson-weekday"> {lesson.date.format('dd')}</span>
                        </span>

                        <span>
                            <span className="lesson-time">{lesson.date.format('H:mm')}</span>
                            <span className="lesson-duration"> {`${lesson.duration} мин.`}</span>
                        </span>
                    </>}
                    action={onDelete &&
                        <Icon onClick={event => onDelete(event, lesson)}>delete</Icon>
                    }
                    rectangular
                    actionable
                    onClick={() => onClick(lesson)}
                />
            )}
        </PillGroup>
    );
}