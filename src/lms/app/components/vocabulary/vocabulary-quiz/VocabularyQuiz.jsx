import { useHistory } from 'react-router-dom';

import LoadingIndicator from 'shared/components/loading-indicator';
import Page from 'shared/components/page';
import { getComponent } from 'shared/components/quiz';
import { useQuiz } from 'shared/hooks/quizzes';
import { useVocabulary } from 'shared/hooks/vocabularies';

import VocabularyQuizEmptyState from './VocabularyQuizEmptyState';
import VocabularyQuizItem from './VocabularyQuizItem';
import VocabularyQuizStatistic from './VocabularyQuizStatistic';

import styles from './VocabularyQuiz.module.scss';

export default function VocabularyQuiz({ match }) {
    const history = useHistory();

    const [vocabulary, actions] = useVocabulary(match.params.vocabulary);

    const { name, Component, getData } = getComponent(match.params.quiz);

    const {
        numberOfItems,
        currentItem,
        currentItemIndex,
        updateStatus,
        updateStatuses,
        continueQuiz,
        statistic,
        showStatistic
    } = useQuiz(vocabulary?.lexemes, getData, actions.updateLexemeStatus);

    const handleBack = () => history.goBack();

    if (!vocabulary) return <LoadingIndicator />;

    if (!Component) throw new Error('No component for quiz');

    return (
        <Page title="Тренажер слов" layout="narrow">
            <Page.Header
                title="Тренажер слов"
                description={name}
                breadcrumbs={[{
                    content: 'Словарь',
                    to: `/vocabulary/${vocabulary.id}`
                }]}
            />

            <Page.Content>
                <div className={styles.quiz}>
                    {showStatistic ?
                        <VocabularyQuizStatistic
                            statistic={statistic}
                            onContinue={continueQuiz}
                            onBack={handleBack}
                        /> :
                        <VocabularyQuizItem
                            item={currentItem}
                            itemIndex={currentItemIndex}
                            numberOfItems={numberOfItems}
                        >
                            {currentItem ? (
                                <Component
                                    item={currentItem}
                                    itemIndex={currentItemIndex}
                                    numberOfItems={numberOfItems}
                                    updateStatus={updateStatus}
                                    updateStatuses={updateStatuses}
                                />
                            ) : (
                                <VocabularyQuizEmptyState onAction={handleBack} />
                            )}
                        </VocabularyQuizItem>
                    }
                </div>
            </Page.Content>
        </Page>
    );
}