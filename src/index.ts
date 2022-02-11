import { app } from "./app"
import { getAllPizzas } from "./endpoints/getAllPizzas"
import { getListOrders } from "./endpoints/getListOrders"
import { getOrderById } from "./endpoints/getOrderById"
import { registerOrders } from "./endpoints/registerOrder"

app.get("/pizzas", getAllPizzas)

app.get("/orders", getListOrders)

app.get("/orders/:id", getOrderById)

app.post("/orders", registerOrders)