import IProduct from "@/interfaces/product";
import instance from "./instance";
import axios from "axios";

export function addProduct(product: FormData) {
    return instance.post('/products', product, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}

export async function getProducts() {
    const { data } = await instance.get<IProduct[]>('/products');
    const newData : IProduct[] = []
    for (const item of data) {
        const { data: imageBuffer } : { data: Blob } = await axios.get(item.image as string, { responseType: 'blob' });
        item.image = URL.createObjectURL(imageBuffer);
        newData.push(item);
    }
    return { data: newData };
}

export async function getProduct(id: number | string) {
    const { data } = await instance.get<IProduct>(`/products/${id}`)
    const { data: imageBuffer } : { data: Blob } = await axios.get(data.image as string, { responseType: 'blob' });
    data.image = URL.createObjectURL(imageBuffer);
    return { data: data };
}

export function updateProduct(id: number | string, product: FormData) {
    return instance.patch(`/products/${id}`, product);
}

export function deleteProduct(id: number | string) {
    return instance.delete(`/products/${id}`);
}