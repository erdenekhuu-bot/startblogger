"use client";
import { useRouter } from "next/router";
import { Button, Switch } from "antd";

const LanguageSwitcher = () => {
  const router = useRouter();
  const { locales, locale } = router;

  const changeLanguage = (checked: boolean) => {
    const newLocale = checked ? "en" : "mn";
    router.push(router.asPath, undefined, { locale: newLocale });
  };

  return (
    <Switch
      checkedChildren="en"
      unCheckedChildren="mn"
      checked={locale === "en"}
      onChange={changeLanguage}
    />
  );
};

export default LanguageSwitcher;
