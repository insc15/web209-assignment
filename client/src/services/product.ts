import IProduct from "@/interfaces/product";
import instance from "./instance";

export function addProduct(product: FormData) {
    return instance.post('/products', product, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export function getProducts() {
    return instance.get<IProduct[]>('/products');
}