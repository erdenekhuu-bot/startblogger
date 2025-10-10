import { useRouter } from 'next/router';
import { Button } from "antd";

const LanguageSwitcher = () => {
    const router = useRouter();
    const { locales, locale } = router;

    const changeLanguage = (lng: string) => {
        router.push(router.asPath, undefined, { locale: lng });
    };

    return (
        <div>
            {locales?.map((lng) => (
                <Button key={lng} onClick={() => changeLanguage(lng)}>
                    {lng.toUpperCase()}
                </Button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
