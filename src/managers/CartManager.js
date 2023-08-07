import fs from 'fs'


export default class CartManager {

    constructor(path) {
        this.path = path
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const listCarts = await fs.promises.readFile(this.path, "utf-8")
                const listCartsParse = JSON.parse(listCarts)
                return listCartsParse
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }



    async generateCartId() {
        {
            if (fs.existsSync(this.path)) {
                const listCarts = await this.getCarts()
                const counter = listCarts.length
                if (counter == 0) {
                    return 1
                }
                else {
                    return (listCarts[counter - 1].id) + 1
                }
            }
        }
    }


    async addCart() {
        const listCarts = await this.getCarts()
        const id = await this.generateCartId()
        const cartnew = {
            id,
            products: []
        }
        listCarts.push(cartnew)
        await fs.promises.writeFile(this.path, JSON.stringify(listCarts, null, 2))
    }

    async getCartsById(id) {
        const { cid } = id
        try {
            const allCarts = await this.getCarts()
            const cartsId = allCarts.find(c => c.id === parseInt(cid))
            if (cartsId) {
                return cartsId
            } else {
                return "CART NO ENCONTRADO"
            }
        } catch (error) {
            return error
        }
    }

    async addProductsToCart(cid, pid) {
        const listCarts = await this.getCarts()
        const cartsearch = listCarts.find(c => c.id === cid)
        const productsIndex = cartsearch.products.findIndex(p => p.pid === pid)
        if (productsIndex !==-1) {
            cartsearch.products[productsIndex].quantity++;
        } else {
            cartsearch.products.push({
                pid,
                quantity: 1
            });
        }

        await fs.promises.writeFile(this.path, JSON.stringify(listCarts))
    }

}
