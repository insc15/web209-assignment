import instance from "./instance"

export const createOrder = (data: any) => {
    return instance.post("/order", data)
}
export const getAll = () => {
    return instance.get("/order")
}
export const get = (id: string) => {
    return instance.get("/order/" + id)
}
export const update = (id: string, order: string) => {
    return instance.patch("/order/" + id, order)
}
