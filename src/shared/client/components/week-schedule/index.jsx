import './index.scss';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function WeekSchedule({ schedule }) {
    const map = new Map(schedule.map(({ day, from }) => [day, from]));

    return (
        <div className="week-schedule">
            {days.map((day, index) =>
                <div key={index} className="day-schedule">
                    <div className="day-name">{day}</div>

                    <div className="day-content">
                        {map.has(index) &&
                            <div className="day-event">
                                <time>{map.get(index)}</time>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}