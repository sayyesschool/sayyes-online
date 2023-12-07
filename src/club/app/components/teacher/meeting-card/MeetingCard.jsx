import { Button, Card } from 'shared/components/ui';
import datetime from 'shared/libs/datetime';

export default function MeetingCard({ meeting }) {
    const meetingTime = datetime(meeting.date).tz('Europe/Moscow').locale('en-us').format('MMMM D, YYYY @ H:mm');

    return (
        <Card>
            {meetingTime} (Moscow)

            {meeting.registrations.length} registrants

            <Button
                as="a"
                href={meeting.startUrl}
                content="Start"
            />
        </Card>
    );
}