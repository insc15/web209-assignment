import IProduct from "@/interfaces/product";
import instance from "./instance";

export async function addProduct(product : IProduct) {
    return await instance.post('/products', product);
}