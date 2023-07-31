import banner from '../assets/images/banner.jpg';
import Container from '../components/layout/container';
import Section from '../components/layout/section';
import { BsChevronRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '@/redux/services/category';
import IProduct from '@/interfaces/product';
import ListProducts from '@/components/listProducts';
import { useGetProductsQuery } from '@/redux/services/product';

function PageHome() {
    const [productByCategory, setProductByCategory] = useState<{products: IProduct[], name: string, _id: string}[]>([]);
    const { data: categories } = useGetCategoriesQuery();
    const { data: products } = useGetProductsQuery();

    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         if(categories && categories.length > 0) {
    //             for (const category of categories) {
    //                 // const { data: products } = await getProducts(false, `categoryId=${category._id}`);
    //                 // setProductByCategory(prev => [...prev, {products, name: category.name, _id: category._id}]);
    //             }
    //         }
    //     }
    //     void fetchCategories();
    //   }, [categories]);

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
            {/* {
                productByCategory.length > 0 && productByCategory.map((category, index) => (
                    <Section key={index}>
                        <Container>
                            <h2 className='capitalize font-bold text-2xl mb-6'>{category.name}</h2>
                            <ListProducts products={productByCategory.products}/>
                        </Container>
                    </Section>
                ))
            } */}
            {
                products && products.length > 0 && (
                    <Section>
                        <Container>
                            <h2 className='capitalize font-bold text-2xl mb-6'>Sách Y Học</h2>
                            <ListProducts products={products}/>
                        </Container>
                    </Section>
                )
            }
            {/* <Section>
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