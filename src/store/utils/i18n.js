const validUserLocales = {
    en: true,
    es: true,
    pt: true,
};

export const isValidLocale = (locale) =>{
    return !!validUserLocales[locale];
}