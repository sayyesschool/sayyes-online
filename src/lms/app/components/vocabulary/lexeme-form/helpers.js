export const getInitialData = ({
    publishStatus,
    data = {},
    translation,
    definition,
    examples
}) =>
    publishStatus === 'approved' ?
        data :
        { translation, definition, examples };

export const getLabels = approved =>
    approved
        ? { translation: 'Мои переводы', definition: 'Моё определение' }
        : { translation: 'Переводы', definition: 'Определение' };