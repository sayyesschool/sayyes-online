import React from 'react';
import {
    Card, CardHeader, CardSection,
    Icon,
    List, ListItem, ListItemGraphic, ListItemText, ListItemMeta
} from 'mdc-react';

export default function MeetingDetails({ meeting }) {
    return (
        <Card outlined>
            <CardHeader
                title="Детали"
            />

            <CardSection>
                <List twoLine nonInteractive>
                    <ListItem>
                        <ListItemGraphic>
                            <Icon>event</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary={meeting.datetime || 'Дата и время не указаны'}
                            secondary="Дата и время"
                        />

                        {!meeting.datetime &&
                            <ListItemMeta>
                                <Icon>warning</Icon>
                            </ListItemMeta>
                        }
                    </ListItem>

                    <ListItem>
                        <ListItemGraphic>
                            <Icon>person</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary={(meeting.host && meeting.host.fullname) || 'Ведущий не указан'}
                            secondary="Ведущий"
                        />

                        {!meeting.host &&
                            <ListItemMeta>
                                <Icon>warning</Icon>
                            </ListItemMeta>
                        }
                    </ListItem>

                    <ListItem>
                        <ListItemGraphic>
                            <Icon>star</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary={meeting.level || 'Уровень не указан'}
                            secondary="Уровень"
                        />

                        {!meeting.level &&
                            <ListItemMeta>
                                <Icon>warning</Icon>
                            </ListItemMeta>
                        }
                    </ListItem>

                    <ListItem>
                        <ListItemGraphic>
                            <Icon>timelapse</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary={`${meeting.duration} мин.`}
                            secondary="Продолжительность"
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemGraphic>
                            <Icon>videocam</Icon>
                        </ListItemGraphic>

                        <ListItemText
                            primary={meeting.zoomId}
                            secondary="Идентификатор ZOOM"
                        />
                    </ListItem>

                    {meeting.thumbnailUrl &&
                        <ListItem>
                            <ListItemGraphic>
                                <Icon>photo</Icon>
                            </ListItemGraphic>

                            <ListItemText
                                primary="Обложка"
                                secondary={meeting.thumbnailUrl}
                            />

                            <ListItemMeta>
                                <img src={meeting.thumbnailUrl} style={{width: 'auto', height: '64px'}} />
                            </ListItemMeta>
                        </ListItem>
                    }
                </List>
            </CardSection>
        </Card>
    );
}