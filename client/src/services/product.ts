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

export function getProduct(id: number | string) {
    return instance.get<IProduct>(`/products/${id}`);
}

export function updateProduct(id: number | string, product: FormData) {
    return instance.patch(`/products/${id}`, product);
}