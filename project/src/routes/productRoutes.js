const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 */
router.get('/:id', getProductById);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - description
 *               - image
 *               - brand
 *               - category
 *               - countInStock
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *               countInStock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post(
  '/',
  [
    protect,
    admin,
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price is required').isNumeric(),
    check('description', 'Description is required').not().isEmpty(),
    check('image', 'Image URL is required').not().isEmpty(),
    check('brand', 'Brand is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('countInStock', 'Count in stock is required').isNumeric(),
    validateRequest
  ],
  createProduct
);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update a product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               brand:
 *                 type: string
 *               category:
 *                 type: string
 *               countInStock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.put('/:id', protect, admin, updateProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product (admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;