import { HTMLProps, ReactNode } from 'react';
import { Link as WouterLink, useLocation } from 'wouter';

interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export const ActiveLink = ({ href, children, ...props }: LinkProps) => {
  const [currentLocation] = useLocation();

  console.log(currentLocation === href ? 'active' : '');

  return (
    <WouterLink to={href} {...props}>
      <a className={currentLocation === href ? 'active' : ''}>{children}</a>
    </WouterLink>
  );
};
