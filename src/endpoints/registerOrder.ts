import { connection } from "../data/connection"
import { Request, Response } from "express"
import { Pizza, Order } from "../types"

export const registerOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pizza_id, quantity } = req.body

        if (!pizza_id || !quantity) {
            throw new Error("Preencher todos os parâmetros.")
        }

        const [pizza]: Pizza[] = await connection("LabePizza")
            .select()
            .where({ id: pizza_id })

        if (!pizza) {
            throw new Error("Pizza não encontrada. (pizza_id)!")
        }

        const total_price = pizza.price * quantity

        const order: Order = {
            id: Date.now().toString(),
            pizza_id,
            quantity,
            total_price
        }

        await connection("LabePizza_Orders").insert(order)

        res.status(201).send({ message: "Pedido realizado com sucesso!" })

    } catch (error: any) {
        res.status(400).send({ message: error.message })
    }
}