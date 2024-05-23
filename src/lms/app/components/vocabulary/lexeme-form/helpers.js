export const getInitialData = ({
    approved,
    record = {},
    translations,
    definition, examples
}) =>
    approved ?
        record?.data :
        { translations, definition, examples };

export const getLabels = approved =>
    approved
        ? { translations: 'Мои переводы', definition: 'Моё определение' }
        : { translations: 'Переводы', definition: 'Определение' };

export const getTranslationsString = translations => translations?.join(', ') ?? '';