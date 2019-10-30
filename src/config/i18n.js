import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { I18N_LOCALES_FILES_PATH } from 'config/constants';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: I18N_LOCALES_FILES_PATH,
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    load: 'currentOnly',
    react: {
      useSuspense: true,
    },
  });

export default i18n;
