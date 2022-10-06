import { Button, List, MenuButton, Text } from '@fluentui/react-northstar';
import moment from 'moment';

import Icon from 'shared/ui-components/icon';
import PageSection from 'shared/components/page-section';

import './index.scss';

const statusMenuItems = [
    { key: 'pending', value: 'pending', content: 'В обработке' },
    { key: 'resolved', value: 'resolved', content: 'Успешная' },
    { key: 'rejected', value: 'rejected', content: 'Отказ' },
    { key: 'postponed', value: 'postponed', content: 'Отложенная' },
];

export default function RequestDetails({ request }) {
    return (
        <PageSection
            className="request-details"
            title="Общая информация"
        >
            <List>
                <List.Item
                    icon={request.statusIcon}
                    header={request.statusLabel}
                    content="Статус"
                    trailingIcon={
                        <MenuButton
                            trigger={
                                <Button
                                    icon={<Icon>edit</Icon>}
                                />
                            }
                            menu={statusMenuItems}
                        />
                    }
                />

                <List.Item
                    icon="event"
                    header={moment(request.createdAt).format('DD.MM.YYYY, HH:mm')}
                    content="Дата создания"
                />

                <List.Item
                    icon="person"
                    header={request.client.fullname}
                    content="Клиент"
                    trailingIcon={
                        <Button
                            icon="cancel"
                            title="Отвязать от клиента"
                        />
                    }
                />

                <List.Item
                    icon="person"
                    header={request.manager.fullname}
                    content="Менеджер"
                />

                {request.lesson &&
                    <List.Item
                        icon="event"
                        header={request.lesson.datetime}
                        content="Дата пробного урока"
                        trailingIcon={
                            <Button
                                icon="cancel"
                                title="Отменить урок"
                            />
                        }
                    />
                }

                {request.contactAt &&
                    <List.Item
                        icon="event"
                        header={moment(request.createdAt).format('DD.MM.YYYY, HH:mm')}
                        content="Дата связи"
                    />
                }
            </List>

            <Text>Обучение</Text>

            <List>
                <List.Item
                    media={<Icon>portrait</Icon>}
                    header={request.study.ageLabel}
                    content="Возрастная группа"
                />

                <List.Item
                    media={<Icon>grade</Icon>}
                    header={request.study.levelLabel}
                    content="Уровень"
                />

                <List.Item
                    media={<Icon>flag</Icon>}
                    header={request.study.goal}
                    content="Цель"
                />

                <List.Item
                    media={<Icon>person</Icon>}
                    header={request.study.teacher}
                    content="Преподаватель"
                />

                <List.Item
                    media={<Icon>schedule</Icon>}
                    header={request.study.schedule.map(s => s.label).join(', ')}
                    content="Расписание"
                />
            </List>

            <Text>Аналитика</Text>

            <List>
                <List.Item
                    header={request.channel}
                    content="Канал связи"
                />

                <List.Item
                    header={request.source}
                    content="Источник"
                />
            </List>

            <Text>UTM</Text>

            <List>
                {request.utm.source &&
                    <List.Item
                        header={request.utm.source}
                        content="Source"
                    />
                }

                {request.utm.medium && <List.Item
                    header={request.utm.medium}
                    content="Medium"
                />
                }

                {request.utm.campaign && <List.Item
                    header={request.utm.campaign}
                    content="Campaign"
                />
                }

                {request.utm.term && <List.Item
                    header={request.utm.term}
                    content="Term"
                />
                }

                {request.utm.content && <List.Item
                    header={request.utm.content}
                    content="Content"
                />
                }
            </List>
        </PageSection>
    );
}