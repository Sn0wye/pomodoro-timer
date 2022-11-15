import { ReactNode } from 'react';

import { Header } from '../../components/Header';
import { LayoutContainer } from './styles';

interface Props {
  children?: ReactNode;
}

export const DefaultLayout = ({ children }: Props) => {
  return (
    <LayoutContainer>
      <Header />
      {children}
    </LayoutContainer>
  );
};
