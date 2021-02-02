import React, { useState } from 'react';
import {
    Button,
    Card,
    List,
    Radio
} from 'mdc-react';

import './index.scss';

export default function PlanCard({ plan, selected, selectedPack, onSelect, onPayClick }) {
    return (
        <Card className="plan-card">
            <Card.Header
                title={plan.title}
                subtitle={plan.subtitle}
            />

            <Card.Section>
                <List twoLine>
                    {plan.packs.map(pack =>
                        <List.Item
                            element="label"
                            graphic={<Radio
                                name="pack"
                                value={pack.id}
                                checked={pack === selectedPack}
                                onChange={() => onSelect(plan, pack)}
                            />}
                            primaryText={pack.description}
                            secondaryText={`${pack.price} руб.`}
                            meta={`${Math.round(pack.price / pack.id)} руб./урок`}
                            selected={pack.id === selectedPack?.id}
                        />
                    )}
                </List>
            </Card.Section>

            <Card.Actions>
                <Button unelevated disabled={!selected} onClick={onPayClick}>Оплатить</Button>
            </Card.Actions>
        </Card>
    );
}