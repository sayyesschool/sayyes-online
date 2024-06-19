export const getInitialData = ({
    approved,
    record = {},
    translation,
    definition,
    examples
}) =>
    approved ?
        record?.data :
        { translation, definition, examples };

export const getLabels = approved =>
    approved
        ? { translation: 'Мои переводы', definition: 'Моё определение' }
        : { translation: 'Переводы', definition: 'Определение' };