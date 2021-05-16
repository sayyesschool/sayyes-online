import React from 'react';
import {
    ChipSet, Chip,
    Icon,
} from 'mdc-react';
import classnames from 'classnames';
import moment from 'moment';

import './index.scss';

export default function LessonChipSet({ lessons, onClick = Function.prototype, onDelete }) {
    return (
        <ChipSet className="lesson-chip-set">
            {lessons.map(lesson => ({ ...lesson, date: moment(lesson.date) })).map(lesson =>
                <Chip
                    key={lesson.id || lesson.date.valueOf()}
                    className={classnames('lesson-chip', `lesson-chip--${lesson.status}`)}
                    icon={lesson.trial && <Icon>tour</Icon>}
                    text={<>
                        <span>
                            <span className="lesson-date">{lesson.date.format('D.M')}</span>
                            <span className="lesson-weekday"> {lesson.date.format('dd')}</span>
                        </span>

                        <span>
                            <span className="lesson-time">{lesson.date.format('H:mm')}</span>
                            <span className="lesson-duration"> {`${lesson.duration} мин.`}</span>
                        </span>
                    </>}
                    trailingIcon={onDelete && <Icon onClick={event => onDelete(event, lesson)}>delete</Icon>}
                    onClick={() => onClick(lesson)}
                />
            )}
        </ChipSet>
    );
}