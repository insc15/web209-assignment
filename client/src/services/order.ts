import instance from "./instance"

export const createOrder = (data: any) => {
    return instance.post("/order", data)
}
