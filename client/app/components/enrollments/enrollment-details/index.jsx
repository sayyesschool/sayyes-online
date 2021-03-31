import React from 'react';
import {
    Avatar,
    ChipSet, Chip,
    Icon,
    Tooltip
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <ChipSet>
                <Tooltip label="Преподаватель">
                    <Chip
                        className="person-chip"
                        icon={<Avatar src={enrollment.teacher?.imageUrl} />}
                        text={enrollment.teacher?.fullname}
                    />
                </Tooltip>

                <Tooltip label="Менеджер">
                    <Chip
                        className="person-chip"
                        icon={<Avatar src={enrollment.manager?.imageUrl} />}
                        text={enrollment.manager?.fullname}
                        trailingIcon={
                            <MenuButton
                                button={<Icon>more_vert</Icon>}
                                listProps={{
                                    dense: true
                                }}
                                items={[
                                    { key: 'whatsapp', text: 'Написать в What\'s App', element: 'a', href: `https://wa.me/${enrollment.manager.phone}`, target: '_blank' },
                                    { key: 'email', text: 'Написать письмо', element: 'a', href: `mailto:${enrollment.manager.email}`, target: '_blank' },
                                    { key: 'email', text: 'Позвонить', element: 'a', href: `tel:${enrollment.manager.phone}`, target: '_blank' }
                                ]}
                            />
                        }
                    />
                </Tooltip>
            </ChipSet>
        </section>
    );
}