import React, { useState } from 'react';
import {
    Avatar,
    Card,
    Checkbox,
    Icon,
    IconButton,
    FormField,
    LayoutGrid,
    Typography
} from 'mdc-react';

import Stepper from 'shared/components/stepper';

import EnrollmentPackCard from 'app/components/enrollments/enrollment-pack-card';
import EnrollmentCheckoutForm from 'app/components/enrollments/enrollment-checkout-form';

import './index.scss';

export default function EnrollmentPayCard({ enrollment, onCheckout, onCancel, ...props }) {
    const [selectedPack, setSelectedPack] = useState(enrollment.packs[0]);

    return (
        <Card className="enrollment-pay-card" {...props}>
            <Card.Section className="enrollment-pay-card__section enrollment-pay-card__details-section">
                <img src={STATIC_URL + '/images/cat/cat-welcome.png'} />

                <Typography className="domain-name" type="headline6">{enrollment.domainLabel}</Typography>

                <Typography className="level-name" type="subtitle2">{enrollment.levelLabel}</Typography>

                <div className="teacher">
                    <Avatar className="teacher-image" src={enrollment.teacher.imageUrl} />

                    <Typography className="teacher-name" type="headline6">{enrollment.teacher.fullname}</Typography>
                </div>
            </Card.Section>

            <Card.Section className="enrollment-pay-card__section enrollment-pay-card__steps-section">
                <Card.Header
                    graphic={<Icon>point_of_sale</Icon>}
                    title="Оплата обучения"
                    actions={<IconButton icon="close" onClick={onCancel} />}
                />

                <Stepper>
                    <Stepper.Step graphic={1} label="Выбор пакета уроков" vertical active />
                    <Stepper.Step graphic={2} label="Выбор способа оплаты" vertical />
                    <Stepper.Step graphic={3} label="Переход к оплате" vertical />
                </Stepper>

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

                <FormField label="Я ознакомлен и согласен с условиями Публичной оферты">
                    <Checkbox checked />
                </FormField>
            </Card.Section>

            <Card.Section span="2" className="enrollment-pay-card__section enrollment-pay-card__checkout-section">
                <Card.Header
                    graphic={<Icon>shopping_basket</Icon>}
                    title="К оплате"
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