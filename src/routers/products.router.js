import {Router} from "express"
import {__dirname} from "../Utils.js"
import ProductManager from "../managers/ProductManager.js"

const productManager = new ProductManager(__dirname+"/files/products.json")
const router = Router();


router.get("/products", async (req, res) => {
    try {
        const listProducts = await productManager.getProducts(req.query);
        res.status(200).json({ message: "Show list successful", listProducts })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get("/products/:pid", async (req, res) => {
    try {
        const productFound = await productManager.getProductById(req.params)
        res.status(200).json({ message: "Products", productFound })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post("/products", async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({ message: "Product created", Product: newProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.put("/products/:pid", async (req, res) => {
    try {
        const changeProduct = await productManager.updateProduct(req.params,req.body)
        res.status(200).json({ message: "Product changed", Product: changeProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete("/products/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid)
        const deletedProduct = await productManager.deleteProduct(id)
        res.status(200).json({ message: "Product deleted", Product: deletedProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})


export default router