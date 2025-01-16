import PageSection from 'shared/components/page-section';
import { Card, Flex, Text } from 'shared/ui-components';

export default function MembershipsStats({ memberships }) {
    const startedMemberships = memberships?.filter(membership => new Date(membership.startDate).getMonth() === new Date().getMonth());
    const endedMemberships = memberships?.filter(membership => new Date(membership.endDate).getMonth() === new Date().getMonth());
    const income = startedMemberships?.reduce((sum, membership) => sum + membership.price, 0);

    return (
        <PageSection
            title="Статистика"
            description="Январь"
            compact
            plain
        >
            <Flex gap="md">
                <Card size="sm">
                    <Text
                        content="Начались"
                        end={
                            <Text
                                content={startedMemberships?.length} type="h4"
                                inline
                            />
                        }
                    />
                </Card>

                <Card size="sm">
                    <Text
                        content="Заканчиваются/ись"
                        end={
                            <Text
                                content={endedMemberships?.length} type="h4"
                                inline
                            />
                        }
                    />
                </Card>

                <Card size="sm">
                    <Text
                        content="Доход"
                        end={
                            <Text
                                content={income} type="h4"
                                end={<>₽</>}
                                inline
                            />
                        }
                    />
                </Card>
            </Flex>
        </PageSection>
    );
}