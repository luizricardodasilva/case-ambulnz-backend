export type Pizza = {
    id: string
    name: string 
    price: number
    ingredients: string
}

export type Order = {
    id: string
    pizza_id: string
    quantity: number
    total_price: number
}