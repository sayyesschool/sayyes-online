import { useCallback, useState } from 'react';

import { useBoolean } from 'shared/hooks/state';
import { Box, Button, Checkbox, Flex, Header, Icon, Image, Surface, Text } from 'shared/ui-components';

import EnrollmentPackCard from 'app/components/enrollments/enrollment-pack-card';
import EnrollmentCheckoutForm from 'app/components/enrollments/enrollment-checkout-form';

import './index.scss';

export default function EnrollmentPayCard({ enrollment, onCheckout, onCancel, ...props }) {
    const [selectedPack, setSelectedPack] = useState(enrollment?.packs[0]);
    const [isConfirmed, toggleConfirmed] = useBoolean(true);

    const handleSubmit = useCallback(data => {
        data.packId = selectedPack.id;
        onCheckout(data);
    }, [selectedPack, onCheckout]);

    return (
        <Surface className="enrollment-pay-card" {...props}>
            <Flex>
                <Flex.Item size="size.quarter">
                    <Box className="enrollment-pay-card__section enrollment-pay-card__details-section">
                        <Header
                            as="h3"
                            content="Направление обучения"
                        />

                        <Image src={enrollment.imageUrl} alt="" />

                        <Text
                            as="p"
                            content={enrollment.domainLabel}
                            size="large"
                            weight="bold"
                        />
                    </Box>
                </Flex.Item>

                <Flex.Item size="size.half">
                    <Box className="enrollment-pay-card__section enrollment-pay-card__steps-section">
                        <Header
                            as="h3"
                            content="Выбор пакета"
                        />

                        <Flex className="pack-card-grid" space="between">
                            {enrollment.packs.map((pack, index) =>
                                <EnrollmentPackCard
                                    key={index}
                                    pack={pack}
                                    selected={pack === selectedPack}
                                    onSelect={setSelectedPack}
                                />
                            )}
                        </Flex>

                        <Checkbox
                            label={<Text>Я ознакомлен и согласен с условиями <a href="/offer">Публичной оферты</a>.</Text>}
                            checked={isConfirmed}
                            onChange={toggleConfirmed}
                        />
                    </Box>
                </Flex.Item>

                <Flex.Item size="size.quarter">
                    <Box className="enrollment-pay-card__section enrollment-pay-card__checkout-section">
                        <Flex space="between">
                            <Header
                                as="h3"
                                content="К оплате"
                            />

                            <Button
                                icon={<Icon>close</Icon>}
                                size="small"
                                iconOnly
                                inverted
                                onClick={onCancel}
                            />
                        </Flex>

                        <EnrollmentCheckoutForm
                            enrollment={enrollment}
                            pack={selectedPack}
                            onSubmit={handleSubmit}
                        />
                    </Box>
                </Flex.Item>
            </Flex>
        </Surface>
    );
}