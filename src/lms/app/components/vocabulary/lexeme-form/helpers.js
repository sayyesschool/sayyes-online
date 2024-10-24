export const getInitialData = ({
    approved,
    data = {},
    translation,
    definition,
    examples
}) =>
    approved ?
        data :
        { translation, definition, examples };

export const getLabels = approved =>
    approved
        ? { translation: 'Мои переводы', definition: 'Моё определение' }
        : { translation: 'Переводы', definition: 'Определение' };