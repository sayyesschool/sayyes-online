import {
    Avatar,
    Card
} from 'mdc-react';

import MenuButton from 'shared/components/menu-button';

import './index.scss';

export default function EnrollmentDetails({ enrollment }) {
    return (
        <section className="enrollment-details">
            <Card>
                <Card.Header
                    graphic={
                        <Avatar
                            image={enrollment.teacher.imageUrl}
                            size="medium"
                        />
                    }
                    title={enrollment.teacher.fullname}
                    subtitle="Преподаватель"
                />
            </Card>

            <Card>
                <Card.Header
                    graphic={
                        <Avatar
                            image={enrollment.manager.imageUrl}
                            size="medium"
                        />
                    }
                    title={enrollment.manager.fullname}
                    subtitle="Менеджер"
                    actions={
                        <MenuButton
                            items={[
                                { key: 'whatsapp', text: 'Написать в What\'s App', element: 'a', href: `https://wa.me/${enrollment.manager.phone}`, target: '_blank' },
                                { key: 'email', text: 'Написать письмо', element: 'a', href: `mailto:${enrollment.manager.email}`, target: '_blank' },
                                { key: 'email', text: 'Позвонить', element: 'a', href: `tel:${enrollment.manager.phone}`, target: '_blank' }
                            ]}
                        />
                    }
                />
            </Card>
        </section>
    );
}