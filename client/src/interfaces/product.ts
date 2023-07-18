export default interface IProduct{
    id: string | number;
    image: string;
    name: string;
    price: number;
    discount_price?: number;
    short_description?: string;
    category_id: number;
    stock: number;
    author: string;
    description: string;
    publisher?: string;
    page_num?: number;
    publishing_year?: number;
    language?: string;
}