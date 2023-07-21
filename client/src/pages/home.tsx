import banner from '../assets/images/banner.jpg';
import Container from '../components/layout/container';
import Section from '../components/layout/section';
import { BsChevronRight } from 'react-icons/bs';
import ListProducts from '../components/listProducts';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/product';
import IProduct from '@/interfaces/product';
import { getAll } from '@/services/category';

function PageHome() {
    const [categories, setCategories] = useState<{id: string, name: string ,products: IProduct[]}[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesData = []
            const { data: categories } = await getAll();
            for (const category of categories) {
                const { data: products } = await getProducts(false, `categoryId=${category._id}`);
                categoriesData.push({
                    id: category._id,
                    name: category.name,
                    products: products
                })
            }
            setCategories(categoriesData);
        }
        void fetchCategories();
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
            {
                categories.map((category, index) => (
                    <Section key={index}>
                        <Container>
                            <h2 className='capitalize font-bold text-2xl mb-6'>{category.name}</h2>
                            <ListProducts products={category.products}/>
                        </Container>
                    </Section>
                ))
            }
            {/* <Section>
                <Container>
                    <h2 className='capitalize font-bold text-2xl mb-6'>Sách Y Học</h2>
                    <ListProducts products={products}/>
                </Container>
            </Section>
            <Section>
                <Container>
                    <h2 className='capitalize font-bold text-2xl mb-6'>Sách kinh doanh</h2>
                    <ListProducts products={products}/>
                </Container>
            </Section>
            <Section>
                <Container>
                    <h2 className='capitalize font-bold text-2xl mb-6'>Tất cả sản phẩm</h2>
                    <ListProducts products={products} limit={10}/>
                </Container>
            </Section>
            <Section>
                <Container className='flex items-center'>
                    <div className="w-1/4 flex">
                        
                    </div>
                </Container>
            </Section> */}
        </>
    );
}

export default PageHome;