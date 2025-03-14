import PageSection from 'shared/components/page-section';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { IconButton } from 'shared/ui-components';

import VocabularyLexemes from 'lms/components/vocabulary/vocabulary-lexemes';

import styles from './EnrollmentVocabulary.module.scss';

export default function EnrollmentVocabulary({
    enrollment,
    user,
    onClose
}) {
    const [vocabulary] = useVocabulary('my', { learnerId: enrollment?.learner.id || '' });

    if (!vocabulary) return null;

    return (
        <PageSection
            className={styles.root}
            title="Словарь"
            actions={
                <IconButton
                    icon="close"
                    title="Закрыть"
                    size="sm"
                    onClick={onClose}
                />
            }
            shadow={false}
            compact
        >
            <VocabularyLexemes
                vocabulary={vocabulary}
                user={user}
                learnerId={enrollment.learner?.id}
                inline
            />
        </PageSection>
    );
}