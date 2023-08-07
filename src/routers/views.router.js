import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import { __dirname } from "../Utils.js";




const pmanager = new ProductManager(__dirname+"/files/products.json")

const router = Router()

router.get("/", async (req,res)=>{
    const listProducts = await pmanager.getProducts({})
    res.render("home", {listProducts})
})

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTimeProducts")
})




export default router