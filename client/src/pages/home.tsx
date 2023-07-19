import banner from '../assets/images/banner.jpg';
import Container from '../components/layout/container';
import Section from '../components/layout/section';
import { BsChevronRight } from 'react-icons/bs';
import ListProducts from '../components/listProducts';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/product';
import IProduct from '@/interfaces/product';
// import products from './db';

function PageHome() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
          const { data: products } = await getProducts();
          setProducts(products);
        };
        void fetchProducts();
      }, []);

    return (
        <>
            <Section className='h-[500px]'>
                <img className='absolute top-0 bottom-0 left-0 right-0 w-full -z-10' src={banner} alt="banner" />
                <Container className='h-full flex flex-col justify-center items-start z-10 text-white'>
                    <p className='text-xl font-medium uppercase'>Special Offer</p>
                    <h1 className='text-5xl leading-snug font-bold my-3'>There's nothing <br /> better than to read</h1>
                    <p className='text-xl'>Discover the best books online with us</p>
                    <button className='bg-white hover:bg-primary text-primary hover:text-white uppercase font-semibold duration-150 px-10 py-3 rounded-full mt-5 flex items-center'>
                        <span>Shop Now</span>
                        <BsChevronRight className="ml-2"/>
                    </button>
                </Container>
            </Section>
            <Section>
                <Container>
                    <h2 className='capitalize font-bold text-2xl mb-6'>Trending now</h2>
                    <ListProducts products={products}/>
                </Container>
            </Section>
            <Section>
                <Container>
                    <h2 className='capitalize font-bold text-2xl mb-6'>Bestselling Books</h2>
                    <ListProducts products={products}/>
                </Container>
            </Section>
            <Section>
                <Container>
                    <h2 className='capitalize font-bold text-2xl mb-6'>All books</h2>
                    <ListProducts products={products} limit={10}/>
                </Container>
            </Section>
            <Section>
                <Container className='flex items-center'>
                    <div className="w-1/4 flex">
                        
                    </div>
                </Container>
            </Section>
        </>
    );
}

export default PageHome;