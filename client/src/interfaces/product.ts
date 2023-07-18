export default interface IProduct{
    id?: string | number;
    name: string;
    author: string;
    price: number;
    discount_price?: number;
    image: string;
}