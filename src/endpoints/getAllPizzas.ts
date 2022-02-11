import { connection } from "../data/connection"
import { Request, Response } from "express"
import { Pizza } from "../types"

export const getAllPizzas = async (req: Request, res: Response): Promise<void> => {
    try {
        const pizzas: Pizza[] = await connection("LabePizza")

        res.send({ pizzas })

    } catch (error:any) {
        res.status(400).send({ message: error.message })
    }
}