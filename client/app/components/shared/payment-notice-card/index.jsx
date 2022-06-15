import { Link } from 'react-router-dom';
import {
    Button,
    Card
} from '@fluentui/react-northstar';

export default function PaymentNoticeCard({ onPay }) {
    return (
        <Card outlined>
            <Card.Header
                title="У вас на балансе нет уроков"
                subtitle="Для продолжения обучения купите уроки"
            />

            <Card.Actions>
                <Card.Action>
                    <Button
                        component={Link}
                        to="/pay"
                        label="Купить уроки"
                        onClick={onPay}
                    />
                </Card.Action>
            </Card.Actions>
        </Card>
    );
}