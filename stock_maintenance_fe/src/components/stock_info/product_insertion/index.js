import React from 'react'
import Header from '../header/index'
import classess from './style.module.css'
import Swal from 'sweetalert2'
const ProductInserttion = () =>{
    const [productName,setProductName] = React.useState('')
    const [producttype,setProductType] = React.useState('')
    const [initalStock,setInitalStock] = React.useState('')
    const [priceValue,setpriceValue] = React.useState('')
    const  product =  (e) =>{
        setProductName(e.target.value)
    }

    const type = (e) =>{
        setProductType(e.target.value)
    }

    const stock = (e) =>{
        setInitalStock(e.target.value)
    }

    const price  = (e) =>{
        setpriceValue(e.target.value)
    }
    const SubmitValue = (e) =>{
        e.preventDefault();
        fetch('http://localhost/stock_maitenance_be/public/api/insert-product',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                product_name:productName,
                product_type:producttype,
                product_price:priceValue,
                product_stock:initalStock
            })
    
        }).then(response=>{
            return response.json();
        }).then((data)=>{
            if(data.status === true){
                setpriceValue('')
                setProductName('')
                setpriceValue('')
                setInitalStock('')
                setProductType('')
                Swal.fire({
                    icon:'success',
                    text:data.message
                })
            }
            else{
                Swal.fire({
                    icon:'error',
                    text:data.message
                })
            }
        })
    }
    return(
        <React.Fragment>
            <Header page_name="Product Insertion"/>
            <div>
                 <div className={classess.insertion_form_setting}>
                        <form onSubmit={SubmitValue}>
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Name<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="text" name="product_name" className={classess.input_field_styling} value={productName} placeholder="Enter Product Name..." required onChange={product}/>
                              </div>
                            
                          </div>
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Type<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="text" name="product_type" className={classess.input_field_styling}  value={producttype} required placeholder="Enter Product Type..." onChange={type}/>
                              </div>
                            
                          </div>
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Inital Stock<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="number" name="produt_inital_stock" className={classess.input_field_styling} value={initalStock} required placeholder="Inital Stock Number.." onChange={stock}/>
                              </div>
                            
                          </div>
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Price<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="number" name="product_price" className={classess.input_field_styling} required value={priceValue} placeholder="Enter Product Price..." onChange={price}/>
                              </div>
                            
                          </div>
                          <input type="submit" name="submit" value="Submit" className={classess.submit_button_styling}/>
                         
                        </form>
                 </div>
            </div>
           
           
        </React.Fragment>
    )
}
export default ProductInserttion;