import { Button, Item } from '../shared';

export default function MeetingComponent({ meeting, onRegister }) {
    return (
        <div className="flex-column gap-l">
            <div className="meeting-card card">
                <div className="card__media">
                    <img src={meeting.thumbnailUrl} alt="" />
                </div>

                <div className="card__header">
                    <div className="flex align-center justify-between gap-xs">
                        <p className="card__subtitle">{meeting.datetime}</p>

                        <div className="tags">
                            <span className="tag">{meeting.levelLabel}</span>

                            <span
                                className={`tag tag--${meeting.online ? 'yellow' : 'purple'}`}
                            >
                                {meeting.online ? 'Онлайн' : 'Оффлайн'}
                            </span>
                        </div>
                    </div>

                    <h3 className="card__title">{meeting.title}</h3>
                </div>

                <div className="card__body">
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: meeting.description }}
                    />

                    <ul className="list gap-xs">
                        {meeting.host &&
                            <Item
                                content={meeting.host.fullname}
                                iconClassName="teacher-icon"
                                icon
                            />
                        }

                        <Item
                            content={meeting.durationLabel}
                            iconClassName="time-icon"
                            icon
                        />
                    </ul>
                </div>

                <div className="card__footer">
                    <Button
                        content="Записаться"
                        full
                        onClick={onRegister}
                    />
                </div>
            </div>
        </div>
    );
}

;