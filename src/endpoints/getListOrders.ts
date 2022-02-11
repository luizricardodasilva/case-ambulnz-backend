import { connection } from "../data/connection"
import { Request, Response } from "express"
import { Order } from "../types"

export const getListOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const listOrders: Order[] = await connection("LabePizza_Orders")
            .select(
                "LabePizza_Orders.id",
                "LabePizza.name", 
                "LabePizza_Orders.quantity")
            .innerJoin("LabePizza", "LabePizza.id", "=", "LabePizza_Orders.pizza_id")

        res.send({ listOrders })

    } catch (error:any) {
        res.status(400).send({ message: error.message })
    }
}