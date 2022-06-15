import { List, Text } from '@fluentui/react-northstar';

import PageSection from 'shared/components/page-section';

export default function PaymentsCard({ payments }) {
    return (
        <PageSection title="Платежи">
            {payments.length > 0 ?
                <List>
                    {payments.map(payment =>
                        <ListItem
                            key={payment.id}
                            header={payment.title}
                            content={payment.meeting ? payment.meeting.title : 'Не использован'}
                        />
                    )}
                </List>
                :
                <Text>Вы еще не совершили ни один платеж.</Text>
            }
        </PageSection>
    );
}