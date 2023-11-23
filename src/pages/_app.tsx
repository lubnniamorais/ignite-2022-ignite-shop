import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';

import Image from 'next/image';

import logoIgniteImg from '../assets/logo.svg';

import { Container, Header } from '../styles/pages/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoIgniteImg} alt="" />
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
