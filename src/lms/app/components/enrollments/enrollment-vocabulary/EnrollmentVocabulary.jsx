import PageSection from 'shared/components/page-section';
import { useVocabulary } from 'shared/hooks/vocabularies';
import { IconButton } from 'shared/ui-components';

import Vocabulary from 'lms/components/vocabulary/vocabulary';

import styles from './EnrollmentVocabulary.module.scss';

export default function EnrollmentVocabulary({
    enrollment,
    user,
    onClose
}) {
    const [vocabulary] = useVocabulary('my', {
        learnerId: enrollment?.learner.id || ''
    });

    if (!vocabulary) return null;

    return (
        <PageSection
            className={styles.root}
            title="Словарь ученика"
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
            <Vocabulary
                vocabulary={vocabulary}
                learnerId={enrollment.learner?.id}
                userId={enrollment.learner?.id}
                inline
            />
        </PageSection>
    );
}