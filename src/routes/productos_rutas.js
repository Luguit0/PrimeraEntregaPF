import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const productList = new ProductManager('./src/productos.json')

router.get('/', (req,res) => {
    res.status(200).send(productList.getProducts())
})

router.get('/:pid', (req,res) => {
    const { pid } = req.params;

    const result = productList.getProductByID(pid);

    if( result.id ){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
})

router.post('/', (req,res) => {
    const {title, description, code, price, status,  stock, category, thumbnails} = req.body;

    if(!title){
        throw new Error('Se requiere Titulo.')
    }

    if(!description){
        throw new Error('Se requiere Descripcion.')
    }

    if(!code){
        throw new Error('Se requiere Codigo.')
    }

    if(!price){
        throw new Error('Se requiere Precio.')
    }

    if(!status){
        throw new Error('Se requiere Status.')
    }

    if(!stock){
        throw new Error('Se requiere Stock.')
    }

    if(!category){
        throw new Error('Se requiere Categoria.')
    }

    const product = {title, description, code, price, status, stock, category, thumbnails}
    const result = productList.addProduct(product);
    res.status(200).send(result)
})

router.put('/:pid', (req,res) => {
    const {pid} = req.params;
    const {title, description, code, price, status,  stock, category, thumbnails} = req.body;

    const result = productList.updateProduct(pid, {title, description, code, price, status,  stock, category, thumbnails});

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
})

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;

    const result = productList.deleteProduct(pid);

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
    
})

export default router;