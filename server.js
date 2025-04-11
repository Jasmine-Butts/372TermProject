"use strict";
const express = require('express');
const app = express();

const multer = require('multer');  
app.use(multer().none());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Middleware to handle invalid JSON payloads
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Invalid JSON payload:', err.message);
        return res.status(400).send({ error: 'Invalid JSON payload' });
    }
    next();
});

const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

app.use('/admin', adminRoutes);
app.use('/user', userRoutes)

let dummyProducts = [
    { 
        productId: 1, 
        name: 'Dia Knot Ring',
        imageUrl: '/images/ring.jpg',
        description: 'Dia Knot is an expression of unwavering bonds.', 
        price: 75.00,
        details: '18k gold with round brilliant diamonds. Carat weight: 0.25.',
        categoryId: 4,
    },
    { 
        productId: 2, 
        name: 'Leaf Ring', 
        imageUrl: '/images/ring3.jpg',
        description: 'The Leaf Ring features a delicate leaf band design.',
        price: 55.50,
        details: '18k yellow gold.',
        categoryId: 4,
    },
];

let dummyCart = [];

app.get('/products', (req, res) => {
    res.json(dummyProducts);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = dummyProducts.find(p => p.productId === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.get('/category/:categoryId/products', (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    const products = dummyProducts.filter(p => p.categoryId === categoryId);
    res.json(products);
});

app.get('/search', (req, res) => {
    const query = req.query.q?.toLowerCase() || '';
    const results = dummyProducts.filter(p =>
        p.name.toLowerCase().includes(query)
    );
    res.json(results);
});

app.get('/cart', (req, res) => {
    res.json(dummyCart);
});

app.post('/cart', (req, res) => {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    const existingItem = dummyCart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        dummyCart.push({ productId, quantity });
    }

    res.json({message: 'Item added to cart', cart: dummyCart});
});

app.delete('/cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    dummyCart = dummyCart.filter(item => item.productId !== productId);
    res.json({message: 'Item removed from cart', cart: dummyCart});
});

app.post('/cart/checkout', (req, res) => {
    dummyCart = [];
    res.json({ message: 'Checkout complete, cart is now empty.'})
});


app.use(express.static('public')); 

app.get('/', (req, res) => {
    res.redirect('/admin/products/all');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
    console.log('App listening at http://localhost:' + PORT);
});


process.on('SIGINT', cleanUp);
function cleanUp() {
    console.log('Terminate signal received.');
    console.log('...Closing HTTP server.');
    server.close(() => {
        console.log('...HTTP server closed.')
    })
}
