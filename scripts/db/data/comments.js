import { exercise } from './exercises';
import { learner } from './users';

export const comment = {
    content: 'Comment',
    authorId: learner._id,
    itemId: exercise._id
};

export default [comment];