/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import appSer from '../services/appSer';
import toNewProduct from '../utils/ProductUtils';
import toNewEntry from '../utils/EntryUtils';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const products = await appSer.getProduct();
    res.json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = toNewProduct(req.body);
    const addedProduct = await appSer.addProduct(newProduct);
    res.json(addedProduct);
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : 'Error adding product');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await appSer.getProductEntry(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Error fetching product');
  }
});

router.post('/:id/entries', async (req, res) => {
  try {
    const product = await appSer.findById(req.params.id);
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    const newEntry = toNewEntry(req.body);
    const updatedProduct = await appSer.addEntry(newEntry, req.params.id);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : 'Error adding entry');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const removedProduct = await appSer.removeProduct(req.params.id);
    if (!removedProduct) {
      res.status(404).send('Product not found');
      return;
    }
    res.json(removedProduct);
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
});

export default router;
