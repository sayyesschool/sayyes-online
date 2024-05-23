import { model } from 'mongoose';

import LexemeRecordSchema from './LexemeRecord';
import RecordSchema from './Record';

export const Record = model('Record', RecordSchema);
export const LexemeRecord = Record.discriminator('LexemeRecord', LexemeRecordSchema, 'lexicon');

export default Record;