import React, { useState, useCallback } from 'react';
import {
    Button,
    Card,
    Dialog,
    Icon,
    Layout,
    LayoutGrid,
    SegmentedButton,
    Switch,
    Typography
} from 'mdc-react';
import classnames from 'classnames';

import plans from 'shared/../data/plans-children.json';
import Page from 'shared/components/page';
import PageHeader from 'shared/components/page-header';
import PageContent from 'shared/components/page-content';
import PlanCard from 'app/components/pay/plan-card';
import CheckoutForm from 'app/components/pay/checkout-form';
import CheckoutDialog from 'app/components/pay/checkout-dialog';

import './index.scss';

export default function PayPage() {
    const [selectedPlan, setSelectedPlan] = useState();
    const [selectedPack, setSelectedPack] = useState();
    const [isDialogOpen, setDialogOpen] = useState();
    const [isNative, setNative] = useState(false);

    const handlePlanSelect = useCallback((plan, pack) => {
        setSelectedPlan(plan);
        setSelectedPack(pack);
    }, []);

    return (
        <Page id="pay-page">
            <PageHeader
                title="Оплата обучения"
                subtitle="Выберите план обучения и пакет уроков:"
                pullContent
            >
                <div className={classnames('switch', { 'switch--native': isNative })}>
                    <Switch
                        checked={isNative}
                        onChange={() => setNative(value => !value)}
                    />
                </div>
            </PageHeader>

            <PageContent>


                <LayoutGrid className="plan-grid">
                    {plans.map(plan =>
                        <LayoutGrid.Cell key={plan.id} span="4">
                            <PlanCard
                                plan={plan}
                                selected={plan.id === selectedPlan?.id}
                                selectedPack={selectedPack}
                                onSelect={handlePlanSelect}
                                onPayClick={() => setDialogOpen(true)}
                            />
                        </LayoutGrid.Cell>
                    )}
                </LayoutGrid>

                <Typography className="notice">Если у вас возникнут какие-либо вопросы в процессе оплаты, пожалуйста, свяжитесь с вашим менеджером или напишите нам на <a href="mailto:info@sayes.ru">info@sayes.ru</a>.</Typography>
            </PageContent>

            <CheckoutDialog
                open={isDialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                {selectedPlan &&
                    <CheckoutForm
                        plan={selectedPlan}
                        pack={selectedPack}
                    />
                }
            </CheckoutDialog>
        </Page>
    );
}