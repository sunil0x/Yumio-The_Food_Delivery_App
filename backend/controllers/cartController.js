// Cart controller with PostgreSQL raw SQL queries
// this file is used to handle cart related operations such as adding items to cart, removing items from cart and fetching user cart data

import pool from '../config/db.js';

// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Find user by ID and get their cart data
        const userResult = await pool.query('SELECT cartdata FROM users WHERE id = $1', [req.body.userId]);

        if (userResult.rows.length === 0) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userResult.rows[0].cartdata || {}; // Get existing cart data (lowercase from pg)
        
        // Ensure cartData is an object
        if (typeof cartData === 'string') {
            cartData = JSON.parse(cartData);
        }
        
        if (!cartData[req.body.itemId]) {  // If item is not already in cart
            cartData[req.body.itemId] = 1; // Add item with quantity 1
        } else {
            cartData[req.body.itemId] += 1; // Increment item quantity by 1
        }

        // Update user cart data in database (use JSONB type - pass object directly)
        await pool.query('UPDATE users SET cartdata = $1::jsonb WHERE id = $2', [JSON.stringify(cartData), req.body.userId]);
        
        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        // Find user by ID and get their cart data
        const userResult = await pool.query('SELECT cartdata FROM users WHERE id = $1', [req.body.userId]);

        if (userResult.rows.length === 0) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userResult.rows[0].cartdata || {}; // Get existing cart data (lowercase from pg)

        // Ensure cartData is an object
        if (typeof cartData === 'string') {
            cartData = JSON.parse(cartData);
        }

        if (cartData[req.body.itemId] > 0) { // If item quantity is greater than 0
            cartData[req.body.itemId] -= 1; // Decrement item quantity by 1
        }

        // Update user cart data in database (use JSONB type - pass object directly)
        await pool.query('UPDATE users SET cartdata = $1::jsonb WHERE id = $2', [JSON.stringify(cartData), req.body.userId]);
        
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        // Find user by ID and get their cart data
        const userResult = await pool.query('SELECT cartdata FROM users WHERE id = $1', [req.body.userId]);

        if (userResult.rows.length === 0) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userResult.rows[0].cartdata || {}; // Get user cart data (lowercase from pg)
        
        // Ensure cartData is an object
        if (typeof cartData === 'string') {
            cartData = JSON.parse(cartData);
        }
        
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };