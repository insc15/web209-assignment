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

export async function getProducts(isBlobImage?: boolean, queryParam?: string) {
    const { data } = await instance.get<IProduct[]>('/products' + (queryParam ? ('?'+queryParam) : ''));
    const newData : IProduct[] = []
    if(isBlobImage && data.length > 0) {
        for (const item of data) {
            const { data: imageBuffer } : { data: Blob } = await axios.get(item.image as string, { responseType: 'blob' });
            item.image = URL.createObjectURL(imageBuffer);
            newData.push(item);
        }
    } else if(data.length > 0) {
        newData.push(...data);
    }
    return { data: newData };
}

export async function getProduct(id: number | string, isBlobImage?: boolean) {
    const { data } = await instance.get<IProduct>(`/products/${id}`)
    
    if(isBlobImage) {
        const { data: imageBuffer } : { data: Blob } = await axios.get(data.image as string, { responseType: 'blob' });
        data.image = URL.createObjectURL(imageBuffer);
    }
    return { data: data };
}

export function updateProduct(id: number | string, product: FormData) {
    return instance.patch(`/products/${id}`, product);
}

export function deleteProduct(id: number | string) {
    return instance.delete(`/products/${id}`);
}