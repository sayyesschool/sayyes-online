import { model } from 'mongoose';

import LexiconRecordSchema from './LexiconRecord';
import RecordSchema from './Record';

export const Record = model('Record', RecordSchema);
export const LexiconRecord = Record.discriminator('LexiconRecord', LexiconRecordSchema, 'lexicon');

export default Record;