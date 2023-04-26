import { List, Text } from 'shared/ui-components';
import PageSection from 'shared/components/page-section';

export default function MeetingsCard({ meetings }) {
    return (
        <PageSection title="Встречи">
            {meetings.length > 0 ?
                <List>
                    {meetings.map(meeting =>
                        <List.Item
                            key={meeting.id}
                            header={meeting.title}
                            content={meeting.datetime}
                        />
                    )}
                </List>
                :
                <Text>Вы еще не участвовали ни в одной встрече.</Text>
            }
        </PageSection>
    );
}