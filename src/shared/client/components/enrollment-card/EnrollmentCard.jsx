import { Avatar, Card } from 'shared/ui-components';

export default function EnrollmentCard({ enrollment, ...props }) {
    return (
        <Card className="EnrollmentCard" {...props}>
            <Card.Header
                media={
                    <Avatar text={enrollment.learner.initials} />
                }
                title={enrollment.learner.fullname}
                subtitle={enrollment.domainLabel}
            />
        </Card>
    );
}