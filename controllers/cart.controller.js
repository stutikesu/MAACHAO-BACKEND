import Cart from "../models/cart.model.js";

// Create a new cart item
export const createCartItem = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    const savedItem = await cartItem.save();
    res.status(201).json({ success: true, data: savedItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all cart items for a user
export const getUserCartItems = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cartItems = await Cart.find({ user_id });
    res.status(200).json({ success: true, data: cartItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single cart item by ID
export const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItem = await Cart.findById(id);
    if (!cartItem) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, data: cartItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a cart item
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, data: updatedItem });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a cart item
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, message: "Cart item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Clear all cart items for a user
export const clearUserCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    await Cart.deleteMany({ user_id });
    res.status(200).json({ success: true, message: "User cart cleared" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
