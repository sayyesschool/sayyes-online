import { List, Text } from 'shared/ui-components';
import PageSection from 'shared/components/page-section';

export default function TicketsCard({ tickets }) {
    return (
        <PageSection title="Билеты">

            {tickets.length > 0 ?
                <List>
                    {tickets.map(ticket =>
                        <ListItem
                            key={ticket.id}
                            header={ticket.title}
                            content={ticket.meeting ? ticket.meeting.title : 'Не использован'}
                        />
                    )}
                </List>
                :
                <Text>Вы еще не приобрели ни один билет.</Text>
            }
        </PageSection>
    );
}