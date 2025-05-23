import { Card, Chip, Flex, Heading, Icon, Step, Stepper, Text } from 'shared/components/ui';
import { StatusColor, StatusIcon, StatusLabel } from 'shared/data/registration';
import datetime from 'shared/libs/datetime';
import { getWordEnding } from 'shared/utils/format';

import styles from './MembershipCard.module.scss';

export default function MembershipCard({ membership, ...props }) {
    const heading = `${membership.limit} ${getWordEnding('встреч', membership.limit, ['а', 'и', ''])}`;
    const durationInWeeks = datetime(membership.endDate).diff(membership.startDate, 'weeks');
    const durationUnit = durationInWeeks >= 4 ? 'months' : 'weeks';
    const durationValue = Math.round(datetime(membership.endDate).diff(membership.startDate, durationUnit, durationUnit));
    const durationPeriod = `${durationValue} ${durationUnit === 'months' ?
        getWordEnding('месяц', durationValue, ['', 'а', 'ев']) :
        getWordEnding('недел', durationValue, ['я', 'и', 'ь'])
    }`;
    const durationFromTo = `${datetime(membership.startDate).format('DD.MM.YYYY')} - ${datetime(membership.endDate).format('DD.MM.YYYY')}`;

    return (
        <Card
            className={styles.root}
            variant="plain"
            {...props}
        >
            <Flex
                alignItems="center" justifyContent="space-between"
                gap="large"
            >
                <Flex dir="column" flexShrink="0">
                    <Heading
                        content={heading} type="h3"
                        end={!membership.isValid ?
                            <Chip content="Закончился" color="danger" />
                            : membership.isExpiring ?
                                <Chip content="Заканчивается" color="warning" />
                                : null
                        }
                    />

                    <Text content={durationPeriod} type="body-md" />
                    <Text content={durationFromTo} type="body-sm" />
                </Flex>

                <Stepper sx={{ flex: '1', justifyContent: 'flex-end' }}>
                    {Array.from({ length: membership.limit }, (_, i) =>
                        <Step
                            key={i}
                            indicator={
                                <Step.Indicator
                                    variant={i < membership.registrationsCount ? 'soft' : 'outlined'}
                                    color={i < membership.registrationsCount ? StatusColor[membership.registrations[i]?.status] : undefined}
                                >
                                    {i >= membership.registrationsCount ?
                                        membership.limit > 1 ? i + 1 : null :
                                        <Icon name={StatusIcon[membership.registrations[i]?.status]} size="lg" />
                                    }
                                </Step.Indicator>
                            }
                            title={StatusLabel[membership.registrations[i]?.status]}
                        />
                    )}
                </Stepper>

            </Flex>
        </Card>
    );
}