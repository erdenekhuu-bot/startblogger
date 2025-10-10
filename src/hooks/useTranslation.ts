import { useRouter } from 'next/router';

const useTranslation = () => {
    const { locale } = useRouter();

    const getTranslation = (key: string) => {
        try {
            const translations = require(`../../messages/${locale}.json`);
            return translations[key] || key;
        } catch (error) {
            return key;
        }
    };

    return { t: getTranslation };
};

export default useTranslation;
