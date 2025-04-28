declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module 'next/link' {
  import { ComponentType, ReactNode } from 'react';
  interface LinkProps {
    href: string;
    as?: string;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    passHref?: boolean;
    prefetch?: boolean;
    locale?: string | false;
    className?: string;
    children: ReactNode;
  }
  const Link: ComponentType<LinkProps>;
  export default Link;
}

declare module 'next/router' {
  export function useRouter(): {
    push: (url: string) => void;
    back: () => void;
    query: { [key: string]: string | string[] | undefined };
  };
}

declare module 'next/app' {
  import { AppType } from 'next/dist/shared/lib/utils';
  import { Router } from 'next/router';
  export type AppProps = {
    Component: AppType;
    pageProps: any;
    router: Router;
  };
}

declare module 'next/document' {
  import { ReactElement } from 'react';
  export function Html(props: { children: ReactElement }): ReactElement;
  export function Head(props: { children: ReactElement }): ReactElement;
  export function Main(props: { children: ReactElement }): ReactElement;
  export function NextScript(props: { children: ReactElement }): ReactElement;
} 