import lexemes from './lexemes';
import { learner } from './users';

export default lexemes.map(lexeme => ({
    lexemeId: lexeme._id,
    learnerId: learner._id
}));