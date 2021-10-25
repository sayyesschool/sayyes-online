import { useRef, useState } from 'react';
import {
    Button,
    Card,
    Icon,
    IconButton,
    LayoutGrid, LayoutGridCell,
    List, ListGroup, ListGroupSubheader,
} from 'mdc-react';
import moment from 'moment';

import MenuButton from 'app/components/shared/menu-button';

import './index.scss';

export default function RequestDetails({ request }) {
    const statusListItemRef = useRef();
    const [isStatusMenuOpen, setStatusMenuOpen] = useState(false);

    return (
        <section className="request-details">
            <LayoutGrid>
                <LayoutGridCell span="3">
                    <Card>
                        <Card.Header title="Общая информация" />

                        <Card.Section>
                            <List>
                                <List.Item
                                    leadingIcon={request.statusIcon}
                                    primaryText={request.statusLabel}
                                    secondaryText="Статус"
                                    trailingIcon={
                                        <MenuButton
                                            icon="edit"
                                            items={[
                                                { key: 'pending', 'data-value': 'pending', text: 'В обработке' },
                                                { key: 'resolved', 'data-value': 'resolved', text: 'Успешная' },
                                                { key: 'rejected', 'data-value': 'rejected', text: 'Отказ' },
                                                { key: 'postponed', 'data-value': 'postponed', text: 'Отложенная' },
                                            ]}
                                        />
                                    }
                                />

                                <List.Item
                                    icon="event"
                                    primaryText={moment(request.createdAt).format('DD.MM.YYYY, HH:mm')}
                                    secondaryText="Дата создания"
                                />

                                <List.Item
                                    leadingIcon="person"
                                    primaryText={request.client.fullname}
                                    secondaryText="Клиент"
                                    trailingIcon={
                                        <IconButton
                                            icon="cancel"
                                            title="Отвязать от клиента"
                                        />
                                    }
                                />

                                <List.Item
                                    icon="person"
                                    primaryText={request.manager.fullname}
                                    secondaryText="Менеджер"
                                />

                                {request.lesson &&
                                    <List.Item
                                        leadingIcon="event"
                                        primaryText={request.lesson.datetime}
                                        secondaryText="Дата пробного урока"
                                        trailingIcon={
                                            <IconButton
                                                icon="cancel"
                                                title="Отменить урок"
                                            />
                                        }
                                    />
                                }

                                {request.contactAt &&
                                    <List.Item
                                        icon="event"
                                        primaryText={moment(request.createdAt).format('DD.MM.YYYY, HH:mm')}
                                        secondaryText="Дата связи"
                                    />
                                }
                            </List>
                        </Card.Section>
                    </Card>
                </LayoutGridCell>

                <LayoutGridCell span="3">
                    <Card>
                        <Card.Header
                            graphic={<Icon>school</Icon>}
                            title="Обучение"
                        />

                        <Card.Section>
                            <List>
                                <List.Item
                                    graphic={<Icon>portrait</Icon>}
                                    primaryText={request.study.ageLabel}
                                    secondaryText="Возрастная группа"
                                />

                                <List.Item
                                    graphic={<Icon>grade</Icon>}
                                    primaryText={request.study.levelLabel}
                                    secondaryText="Уровень"
                                />

                                <List.Item
                                    graphic={<Icon>flag</Icon>}
                                    primaryText={request.study.goal}
                                    secondaryText="Цель"
                                />

                                <List.Item
                                    graphic={<Icon>person</Icon>}
                                    primaryText={request.study.teacher}
                                    secondaryText="Преподаватель"
                                />

                                <List.Item
                                    graphic={<Icon>schedule</Icon>}
                                    primaryText={request.study.schedule.map(s => s.label).join(', ')}
                                    secondaryText="Расписание"
                                />
                            </List>
                        </Card.Section>

                        <Card.Actions>
                            <Card.Action>
                                <Button>Запланировать урок</Button>
                            </Card.Action>
                        </Card.Actions>
                    </Card>
                </LayoutGridCell>

                <LayoutGridCell span="3">
                    <Card>
                        <Card.Header
                            graphic={<Icon>analytics</Icon>}
                            title="Аналитика"
                        />

                        <Card.Section>
                            <ListGroup>
                                <List>
                                    <List.Item
                                        primaryText={request.channel}
                                        secondaryText="Канал связи"
                                    />

                                    <List.Item
                                        primaryText={request.source}
                                        secondaryText="Источник"
                                    />
                                </List>

                                <ListGroupSubheader>UTM</ListGroupSubheader>

                                <List>
                                    {request.utm.source &&
                                        <List.Item
                                            primaryText={request.utm.source}
                                            secondaryText="Source"
                                        />
                                    }

                                    {request.utm.medium && <List.Item
                                        primaryText={request.utm.medium}
                                        secondaryText="Medium"
                                    />
                                    }

                                    {request.utm.campaign && <List.Item
                                        primaryText={request.utm.campaign}
                                        secondaryText="Campaign"
                                    />
                                    }

                                    {request.utm.term && <List.Item
                                        primaryText={request.utm.term}
                                        secondaryText="Term"
                                    />
                                    }

                                    {request.utm.content && <List.Item
                                        primaryText={request.utm.content}
                                        secondaryText="Content"
                                    />
                                    }
                                </List>
                            </ListGroup>
                        </Card.Section>
                    </Card>
                </LayoutGridCell>
            </LayoutGrid>
        </section>
    );
}