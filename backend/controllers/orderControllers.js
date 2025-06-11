
const orderModel = require('../models/orderModel')
const productModel = require('../models/productModel')


// Create order = /api/v1/orders
exports.creatOrder = async (req, res, next)=>{
           const cartItems = req.body;
           const ammount = Number(cartItems.reduce(( acc, item)=> (acc + item.product.price * item.qty),0)).toFixed(2);
           const status = 'pending';

          const order = await orderModel.create({cartItems, ammount, status})


//    Updating Product Stock

        cartItems.forEach(async (item) => {
        const product= await productModel.findById(item.product._id)
        product.stock= product.stock - item.qty;
        await product.save();
    
       });


        res.json({
        success:true,
        order
    })
}

