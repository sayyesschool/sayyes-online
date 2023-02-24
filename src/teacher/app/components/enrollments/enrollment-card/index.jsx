import { Avatar, Card } from 'shared/ui-components';

export default function EnrollmentCard({ enrollment, ...props }) {
    return (
        <Card {...props}>
            <Card.Header
                media={
                    <Avatar text={enrollment.client.initials} />
                }
                title={enrollment.client.fullname}
                subtitle={enrollment.domainLabel}
            />
        </Card>
    );
}