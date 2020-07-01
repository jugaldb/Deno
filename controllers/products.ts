import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "First",
    description: "Good Product",
    price: 29.99,
  },
  {
    id: "2",
    name: "second",
    description: "Bad Product",
    price: 10,
  },
];

///@desc    GET all products
///@route   GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

///@desc    GET one products
///@route   GET /api/v1/products/id
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
    const product:Product|undefined =  products.find(p=> p.id ===params.id)

    if(product){
        response.status = 200
        response.body ={
            success :true,
            data:product,
        }
    }
    else{
        response.status = 404
        response.body ={
            success :false,
        }
    }
};

///@desc    Add one products
///@route   Post /api/v1/products
const addProduct = ({ response }: { response: any }) => {
};

///@desc    uppdate one products
///@route   PUT /api/v1/products/:id
const updateProduct = ({ response }: { response: any }) => {
};

///@desc    delete one products
///@route   DEL /api/v1/products/:id
const deleteProduct = ({ response }: { response: any }) => {
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
