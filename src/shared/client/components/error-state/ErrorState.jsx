import { Alert, Text } from 'shared/ui-components';

import './index.scss';

export default function ErrorState({ error, componentStack, resetError }) {
    return (
        <div className="ErrorState">
            <img src="https://media0.giphy.com/media/WpaVhEcp3Qo2TjwyI1/giphy.gif" />

            <Text>Что-то пошло не так:</Text>

            <Alert color="danger">
                <pre>{error.message}</pre>
            </Alert>

            <Text>Нам уже пришло сообщение об этой ошибке, и мы постараемся исправить её как можно быстрее!</Text>
        </div>
    );
}