import {Router} from "express"
import {__dirname} from "../Utils.js"

import CartManager from "../managers/CartManager.js"
const manager = new CartManager (__dirname+"/files/carts.json")
const router = Router()


router.get("/carts", async (req, res) => {
    try {
        const cartlist = await manager.getCarts()
        res.status(200).json({ message: "Show list carts successful", cartlist })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get("/carts/:cid", async (req, res) => {
    try {
        const cartsId = await manager.getCartsById(req.params)
        res.status(200).json({ message: "Show list carts successful", cartsId })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post("/carts", async (req, res) => {
    try {
        const newCart = await manager.addCart(req.body) 
        res.status(200).json({ message: "Added", Cart: newCart })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const cid = parseInt (req.params.cid)
        const pid = parseInt (req.params.pid)
        const addProductsToCart = await manager.addProductsToCart(cid,pid)
        res.status(200).json({ message: "Product added", Product: addProductsToCart })
    } catch (error) {
        res.status(500).json({ error })
    }
})


export default router