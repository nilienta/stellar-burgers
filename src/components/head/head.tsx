import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface IHeadProps {
  title: string;
  isLoading?: boolean;
}

export const Head = ({ title, isLoading }: IHeadProps): JSX.Element => {
  const [titleState, setTitleState] = useState(`${title}`);

  useEffect(() => {
    isLoading ? setTitleState(`${'Загрузка...'}`) : setTitleState(`${title}`);
  }, [isLoading]);

  return (
    <Helmet defer={false}>
      <html lang="ru" />
      <meta charSet="utf-8" />
      <title>{titleState}</title>
    </Helmet>
  );
};
