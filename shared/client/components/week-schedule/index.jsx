import React from 'react';

import './index.scss';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function WeekSchedule({ schedule }) {
    const map = new Map(schedule.map(({ day, time }) => [day, time]));

    return (
        <div className="week-schedule">
            {days.map((day, index) =>
                <div key={index} className="day-schedule">
                    <div className="day-name">{day}</div>
                    <div className="day-content">
                        {map.has(index) &&
                            <div className="day-event">
                                <time>{map.get(index)}:00</time>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}