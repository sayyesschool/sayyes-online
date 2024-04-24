import { Link as RouterLink } from 'react-router-dom';

import { Card, Image, Link } from 'shared/ui-components';

export default function VocabularyCard({ vocabulary, ...props }) {
    const { title, subtitle, imageUrl, numberOfLexemes, coursePath } = vocabulary;

    return (
        <Card
            className="VocabularyCard"
            {...props}
        >
            {imageUrl &&
                <Card.Cover>
                    <Image src={imageUrl} alt="Say Yes" />
                </Card.Cover>
            }

            <Card.Content>
                <Card.Text level="title-lg">{title}</Card.Text>
                <Card.Text color="warning" level="body-sm">{subtitle}</Card.Text>
                <Card.Text level="body-sm">Количество слов - {numberOfLexemes}</Card.Text>

                {coursePath &&
                    <Card.Text level="body-sm">
                        Из курса - <Link component={RouterLink} to={coursePath} color="success">General Eanglish</Link>
                    </Card.Text>
                }
            </Card.Content>
        </Card>
    );
}