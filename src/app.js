import express from "express"
import { __dirname } from "./Utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"

import ViewRouter from "./routers/views.router.js"
import ProductRouter from "./routers/products.router.js"
import CartRouter from "./routers/carts.router.js"


const app = express()
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"))


app.engine("handlebars",handlebars.engine())
app.set("view engine","handlebars")
app.set("views", __dirname+"/views")

app.use("/api", ProductRouter)
app.use("/api", CartRouter)
app.use("/", ViewRouter)

const httpServer = app.listen(PORT, () => {
    console.log("Servidor ONLINE")
})

const socketServer = new Server(httpServer)

import ProductManager from "./managers/ProductManager.js"

const pmanagerSocket = new ProductManager(__dirname+"/files/products.json")

socketServer.on("connection", async (socket) => {
    console.log("Client Connected with ID:", socket.id)
    const products = await pmanagerSocket.getProducts({})
    socketServer.emit("myProducts", products)

    socket.on("addProduct", async(obj)=>{
        await pmanagerSocket.addProduct(obj)
        const products = await pmanagerSocket.getProducts({})
        socketServer.emit("myProducts", products)
    })

    socket.on("deleteProduct", async(id)=>{
        await pmanagerSocket.deleteProduct(id)
        console.log(id)
        const products = await pmanagerSocket.getProducts({})
        socketServer.emit("myProducts", products)
    })
})