/* eslint-disable tailwindcss/no-custom-classname */
import type { HTMLProps, ReactNode } from 'react';
import { Link as WouterLink, useLocation } from 'wouter';

interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export const ActiveLink = ({ href, children, ...props }: LinkProps) => {
  const [currentLocation] = useLocation();

  return (
    <WouterLink to={href} {...props}>
      <a className={currentLocation === href ? 'active' : ''}>{children}</a>
    </WouterLink>
  );
};
