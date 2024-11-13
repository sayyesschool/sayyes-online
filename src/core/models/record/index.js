import { model } from 'mongoose';

import LexemeRecordSchema from './LexemeRecord';
import RecordSchema from './Record';

export default () => {
    const Record = model('Record', RecordSchema);
    const LexemeRecord = Record.discriminator('LexemeRecord', LexemeRecordSchema, 'lexeme');

    return {
        Record,
        LexemeRecord
    };
};