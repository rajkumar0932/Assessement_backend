import { Product } from "../model/product.schema.js";

// 1) Add a product
const AddProduct = async (req, res) => {
    try {
        const { ProductID, Name, Price, Featured, Rating, Company } = req.body;

        if (!ProductID || !Name || Price === undefined || !Company) {
            return res
                .status(400)
                .json({ message: "ProductID, Name, Price and Company are required" });
        }


         const product = await Product.create({ ProductID, Name, Price, Featured, Rating, Company });
         if(!product){
            return res.status(500).json({"message": "something went wrong while storing data"});
         }

        return res.status(201).json({ message: "Product added", product });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// 2) Get all products
const GetAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
      
       
     
        return res
            .status(200)
            .json({ message: "All products", count: products?.length, products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// 3) Update a product
const UpdateProduct = async (req, res) => {
    try {
        const { id } = req.params;

       
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        

        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product updated", product: updated });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// 4) Delete a product
const DeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        
         const deleted = await Product.findByIdAndDelete(id);
      

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product deleted" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// 5) Fetch featured products
const GetFeaturedProducts = async (req, res) => {
    try {
        
        const products = await Product.find({ Featured: true });

        return res
            .status(200)
            .json({ message: "Featured products", count: products?.length, products });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

// 6) Fetch products with price less than a certain value  ->  /products/price?value=100
const GetProductsByPrice = async (req, res) => {
    try {
        const value = Number(req.query.value);
        if (Number.isNaN(value)) {
            return res
                .status(400)
                .json({ message: "Provide a numeric ?value= for price" });
        }

        
        const products = await Product.find({ Price: { $lt: value } });

        return res.status(200).json({
            message: `Products with price less than ${value}`,
            count: products?.length,
            products,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const GetProductsByRating = async (req, res) => {
    try {
        const value = Number(req.query.value);
        if (Number.isNaN(value)) {
            return res
                .status(400)
                .json({ message: "Provide a numeric ?value= for rating" });
        }

     
        const products = await Product.find({ Rating: { $gt: value } });

        return res.status(200).json({
            message: `Products with rating higher than ${value}`,
            count: products?.length,
            products,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export {
    AddProduct,
    GetAllProducts,
    UpdateProduct,
    DeleteProduct,
    GetFeaturedProducts,
    GetProductsByPrice,
    GetProductsByRating,
};
