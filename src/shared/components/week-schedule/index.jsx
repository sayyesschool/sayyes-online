import './index.scss';

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function WeekSchedule({ schedule }) {
    const map = new Map(schedule.map(({ day, from }) => [day, from]));

    return (
        <div className="WeekSchedule">
            {days.map((day, index) =>
                <div key={index} className="WeekSchedule__day">
                    <div className="WeekSchedule__day-name">{day}</div>

                    <div className="WeekSchedule__day-content">
                        {map.has(index) &&
                            <div className="WeekSchedule__day-event">
                                <time>{map.get(index)}</time>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}