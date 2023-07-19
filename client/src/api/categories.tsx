import instance from "./Instance";

export const create = (name: string) => {
    return instance.post("/categories", { name: name })
}
export const getAll = () => {
    return instance.get("/categories")
}
export const remove = (id: string) => {
    return instance.delete("/categories/" + id)
}
export const update = (id: string, nameCate: string) => {
    return instance.patch("/categories/" + id, { name: nameCate })
}
export const get = (id: string) => {
    return instance.get("/categories/" + id)
}