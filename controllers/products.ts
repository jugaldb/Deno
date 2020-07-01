import { Product } from "../types.ts";
import {v4} from 'https://deno.land/std/uuid/mod.ts'

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
const addProduct = async({request, response }: { request:any,response: any }) => {

    const body= await  request.body()

    if(!request.hasBody){
      response.status=404,
      response.body = {
        success:false,
        msg:'No data'
      }
    }
    const product:Product = body.value
    product.id = v4.generate()

    products.push(product)
    response.status = 201 ,
    response.body ={
      success:true,
      data :product
    }

};

///@desc    update one products
///@route   PUT /api/v1/products/:id
const updateProduct = async({ params,request,response }: {params:{id:string},request:any, response: any }) => {
  const product:Product|undefined =  products.find(p=> p.id ===params.id)

  if(product){
    const body = await request.body()
    const updateData:{name?:string,description?:string,price?:number} = body.value

    products = products.map(p=>p.id===params.id ? {...p,...updateData}:p)

    response.status = 200,
    response.body = {
      success:true,
      data : products
    }
  }
  else{
      response.status = 404
      response.body ={
          success :false,
      }
  }
};

///@desc    delete one products
///@route   DEL /api/v1/products/:id
const deleteProduct = ({ params,response }: {params:{id:string}, response: any }) => {
  products = products.filter(p=>p.id!==params.id)
  response.body = {
    success:true,
    msg:'Deleted'
  }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
