import { Scroll, Timer } from 'phosphor-react';
import IgniteLogo from '../../assets/ignite-logo.svg';
import { ActiveLink } from '../ActiveLink';
import { HeaderContainer } from './styles';

export const Header = () => {
  return (
    <HeaderContainer>
      <span>
        <img src={IgniteLogo} alt='' />
      </span>
      <nav>
        <ActiveLink href='/' title='Timer'>
          <Timer size={24} />
        </ActiveLink>
        <ActiveLink href='/history' title='History'>
          <Scroll size={24} />
        </ActiveLink>
      </nav>
    </HeaderContainer>
  );
};
