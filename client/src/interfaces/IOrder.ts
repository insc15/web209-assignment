import IProduct from "./product"

export default interface IOrder {
    map(arg0: (item: IOrder) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode
    _id: string
    paymentMethod: string
    total: number
    status: string
    userId: string
    address: string
    city: string
    phoneNumber: string
    name: string
    district: string
    email: string
    note: string
    createdAt: string
    updatedAt: string
    transactionId: string
    items: {
        _id: string
        orderId: string
        productId: IProduct
        quantity: number
        createdAt: string
        updatedAt: string
      }[]
}