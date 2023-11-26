import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Stripe from 'stripe';

import { HomeContainer, Product } from '../styles/pages/home';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import camiseta01 from '../assets/camisetas/camiseta01.png';
import camiseta02 from '../assets/camisetas/camiseta02.png';
import camiseta03 from '../assets/camisetas/camiseta03.png';
import { stripe } from '../lib/stripe';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [slidesRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={slidesRef} className="keen-slider">
      {products.map((product) => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} alt="" width={520} height={480} />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        );
      })}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
    };
  });

  return {
    props: {
      products,
    },
  };
};
