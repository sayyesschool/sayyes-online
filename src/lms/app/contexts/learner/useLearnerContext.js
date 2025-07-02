import { useContext } from 'react';

import LearnerContext from 'lms/contexts/learner';

export default function useLearnerContext() {
    return useContext(LearnerContext);
}