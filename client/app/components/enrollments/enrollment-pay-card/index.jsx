import { useState } from 'react';
import {
    Card,
    Checkbox,
    Icon,
    IconButton,
    FormField,
    LayoutGrid,
    Typography
} from 'mdc-react';

import EnrollmentPackCard from 'app/components/enrollments/enrollment-pack-card';
import EnrollmentCheckoutForm from 'app/components/enrollments/enrollment-checkout-form';

import './index.scss';

export default function EnrollmentPayCard({ enrollment, onCheckout, onCancel, ...props }) {
    const [selectedPack, setSelectedPack] = useState(enrollment?.packs[0]);
    const [isConfirmed, setConfirmed] = useState(true);

    return (
        <Card className="enrollment-pay-card" {...props}>
            <Card.Section className="enrollment-pay-card__section enrollment-pay-card__details-section">
                <img src={STATIC_URL + enrollment.imageSrc} />

                <Typography className="domain-name" type="headline6">{enrollment.domainLabel}</Typography>
            </Card.Section>

            <Card.Section className="enrollment-pay-card__section enrollment-pay-card__steps-section">
                <Card.Header
                    graphic={<Icon>shopping_basket</Icon>}
                    title="Выбор пакета"
                />

                <LayoutGrid.Cell className="pack-card-grid" grid>
                    {enrollment.packs.map((pack, index) =>
                        <LayoutGrid.Cell key={index} span="3">
                            <EnrollmentPackCard
                                pack={pack}
                                selected={pack === selectedPack}
                                onSelect={setSelectedPack}
                            />
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid.Cell>

                <FormField>
                    <Checkbox
                        checked={isConfirmed}
                        onChange={(event, value) => setConfirmed(value)}
                    />

                    <Typography type="body2" noMargin>Я ознакомлен и согласен с условиями <a href="/offer">Публичной оферты</a>.</Typography>
                </FormField>
            </Card.Section>

            <Card.Section span="2" className="enrollment-pay-card__section enrollment-pay-card__checkout-section">
                <Card.Header
                    graphic={<Icon>point_of_sale</Icon>}
                    title="К оплате"
                    actions={<IconButton icon="close" onClick={onCancel} />}
                />

                <EnrollmentCheckoutForm
                    enrollment={enrollment}
                    pack={selectedPack}
                    onSubmit={onCheckout}
                />
            </Card.Section>
        </Card>
    );
}