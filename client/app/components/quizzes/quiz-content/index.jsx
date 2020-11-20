import React from 'react';

import {
    Button,
    Card, CardHeader, CardSection, CardActions, CardAction,
    LinearProgress,
    List, ListItem, ListItemGraphic,
    Radio,
    Typography
} from '@codedojo/mdc-react';

import MarkdownText from 'components/shared/MarkdownText';

export default class QuizContent extends React.Component {
    state = {
        answer: undefined
    };

    handleAnswer = index => this.setState({ answer: index });

    handleNextButtonClick = () => {
        this.setState({ answer: undefined });
        this.props.onAnswer(this.state.answer);
    };

    handleCompleteButtonClick = () => {
        this.setState({ answer: undefined });
        this.props.onComplete();
    };

    render() {
        const { question, questionPosition, numberOfQuestions, hasNextQuestion, progress } = this.props;
        const { answer } = this.state;

        return (
            <Card>
                <LinearProgress value={progress} />

                <CardSection primary>
                    <Typography type="caption">{hasNextQuestion && `Вопрос ${questionPosition} из ${numberOfQuestions}`}</Typography>

                    <MarkdownText>{question.text}</MarkdownText>
                </CardSection>

                <CardSection>
                    <List>
                        {question.options.map((option, index) =>
                            <ListItem
                                key={index}
                                onClick={() => this.handleAnswer(index)}
                            >
                                <ListItemGraphic>
                                    <Radio
                                        value={answer}
                                        checked={answer === index}
                                    />
                                </ListItemGraphic>

                                <MarkdownText>{option}</MarkdownText>
                            </ListItem>
                        )}
                    </List>
                </CardSection>

                <CardActions>
                    <CardAction>
                        {hasNextQuestion ?
                            <Button onClick={this.handleNextButtonClick}>Далее</Button>
                            :
                            <Button onClick={this.handleCompleteButtonClick}>Завершить</Button>
                        }
                    </CardAction>
                </CardActions>
            </Card>
        );
    }
}