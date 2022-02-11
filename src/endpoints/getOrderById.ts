import { connection } from "../data/connection"
import { Request, Response } from "express"
import { Order } from "../types"

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const result: Order[] = await connection("LabePizza_Orders").where({ "LabePizza_Orders.id": id })

        const order = result

        if (!order) {
            throw new Error("Pedido não encontrado!")
        }

        const orderDetail: Order[] = await connection("LabePizza_Orders")
            .select(
                "LabePizza_Orders.id",
                "LabePizza_Orders.pizza_id",
                "LabePizza.name", 
                "LabePizza_Orders.quantity",
                "LabePizza_Orders.total_price")
            .innerJoin("LabePizza", "LabePizza.id", "=", "LabePizza_Orders.pizza_id")
            .where({ "LabePizza_Orders.id": id })

        res.status(200).send({ orderDetail })

    } catch (error:any) {
        res.status(400).send({ message: error.message })
    }
}