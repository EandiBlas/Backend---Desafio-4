import fs from 'fs'

export default class ProductManager {

    constructor(path) {
        this.path = path
    }

    async getProducts(limitInfo) {
        const { limit } = limitInfo
        try {
            if (fs.existsSync(this.path)) {
                const inf = await fs.promises.readFile(this.path, 'utf-8')
                const productlistparse = JSON.parse(inf)
                const productlistlimit = productlistparse.slice(0, limit)
                return productlistlimit
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }



    async generateId() {
        {
            if (fs.existsSync(this.path)) {
                const listProducts = await this.getProducts({})
                const counter = listProducts.length
                if (counter == 0) {
                    return 1
                }
                else {
                    return (listProducts[counter - 1].id) + 1
                }
            }
        }
    }


    async addProduct(obj) {
        try {
            const { title, description, price, thumbnail, category, status = true, code, stock } = obj
            if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || category === undefined || status === undefined || code === undefined || stock === undefined) {
                return "Error campos vacios"
            }
            else {
                const listProducts = await this.getProducts({})
                const verifyCode = listProducts.find(c => c.code === obj.code)
                if (verifyCode) {
                    return "El codigo se repite"
                } else {
                    const id = await this.generateId()
                    const product = { id, title, description, price, thumbnail, category, status, code, stock }
                    listProducts.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(listProducts))
                }
            }
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        const { pid } = id
        try {
            const productsPrev = await this.getProducts({})
            const productId = productsPrev.find(p => p.id === parseInt(pid))
            if (productId) {
                return productId
            } else {
                return "PRODUCTO NO ENCONTRADO"
            }
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, obj) {
        try {
            const { pid } = id
            const { title, description, price, thumbnail, category, status, code, stock } = obj
            if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || category === undefined || status === undefined || code === undefined || stock === undefined) {
                return "Ingresar todos los datos correspondientes para actualizar el producto"
            }
            else {
                const listProducts = await this.getProducts({})
                console.log(listProducts)
                const verifyCode = listProducts.find(c => c.code === code)
                if (verifyCode) {
                    return "El codigo se repite"
                }
                else {
                    const listProducts = await this.getProducts({})
                    const newProductsList = listProducts.map(p => {
                        if (p.id === parseInt(pid)) {
                            const changeProduct = {
                                ...p,
                                title, description, price, thumbnail, category, status, code, stock
                            }
                            return changeProduct
                        }
                        else {
                            return p
                        }
                    })
                    await fs.promises.writeFile(this.path, JSON.stringify(newProductsList))
                }

            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(pid) {
        try {
            const productPrev = await this.getProducts({})
            const writeNewList = productPrev.filter((r) => r.id !== parseInt(pid))
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(writeNewList)
            )
        } catch (error) {
            return error
        }
    }

}
