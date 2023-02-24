import {
    Card,
    IconButton,
    List
} from 'mdc-react';

export default function MeetingParticipants({ participants, onAdd }) {
    const subtitle = (!participants || participants.length === 0) ? 'Участников пока нет' : participants.length;

    return (
        <Card>
            <Card.Header
                title="Участники"
                subtitle={subtitle}
                actions={
                    <IconButton
                        icon="add"
                        onClick={onAdd}
                    />
                }
            />

            <Card.Section>
                <List>
                    {participants.map(participant =>
                        <List.Item
                            key={participant.id}
                            primaryText={participant.fullname}
                            secondaryText={participant.email}
                        />
                    )}
                </List>
            </Card.Section>
        </Card>
    );
}