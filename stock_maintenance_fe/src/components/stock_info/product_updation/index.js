import React, { useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import  classess from '../product_insertion/style.module.css'
import Header from '../header/index'
import Swal from 'sweetalert2'
const ProductUpdation = () =>{
    const history = useHistory()
    const productName = []
    const [productNameValue,setProductNameValue] = React.useState('')
    const [getName,setGetName] = React.useState('')
    const [updationType,setUpdationType] = React.useState('')
    const [updationAmount,setUpdatedAmount] = React.useState('')
    const [averageSellingPrice,setAverageSellingPrice] = React.useState('')
    const [viewAverageSellingPrice,setViewAverageSellingPrice] = React.useState(false)
    const [viewPurchasingPrice,setViewPurchasingPrice] = React.useState(false)
    const [CostPrice,setCostPrice] = React.useState('')
   
    useEffect(()=>{
        getProductName()
    },[])
    const getProductName = () =>{
        fetch('http://localhost/stock_maitenance_be/public/api/product-name',{
            method:'GET',
            headers:{
                'content-type':'application/json',
                'Accept':'application/json'
            }
        }).then(response=>{
            return response.json()
        }).then((data)=>{
            if(data.status===true){
                data['product_name'].map((name,key)=>{
                   return productName.push(
                       <option value={name['product_name']} key={key}>
                           {name['product_name']}
                       </option>
                   )
                })
                setProductNameValue(productName)

            }
            else{
                Swal.fire({
                    icon:'error',
                    text:data.message
                })
                history.push('/product-insertion')
            }
        })
    }
    const getProductNameValue = (e) =>{
        setGetName(e.target.value)
    }
    const getUpdationType = (e)=>{
        setUpdationType(e.target.value)
        if(e.target.value=='Add'){
            setViewPurchasingPrice(true)
            setViewAverageSellingPrice(false)
        }
        else if(e.target.value=='Subtract'){
            setViewAverageSellingPrice(true)
            setViewPurchasingPrice(false)
        }
    }
    const getUpdatedStock = (e)=>{
        setUpdatedAmount(e.target.value)
    }

    const getAverageSellingPrice = (e) =>{
            setAverageSellingPrice(e.target.value)
    }
    const getProductPurchasingPrice = (e) =>{
        setCostPrice(e.target.value)
    }

    
    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(getName,updationType,updationAmount)
        if(viewPurchasingPrice===true){
            fetch('http://localhost/stock_maitenance_be/public/api/update-stock',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
               
                body:JSON.stringify({
                    product_name:getName,
                    updation_type:updationType,
                    stock_value:updationAmount,
                    cost_price:CostPrice
                    
                })
    
            }).then(response=>{
                return response.json()
            }).then((data)=>{
                if(data.status===true){
                    Swal.fire({
                        icon:'success',
                        text:data.message
                    })
                    setGetName('')
                    setUpdationType('')
                    setUpdatedAmount('')
                    setCostPrice('')
                    // history.push({
                    //     pathname:'/view-stock'
                    // })
    
                }
                else{
                    Swal.fire({
                        icon:'error',
                        text:data.message
                    })
                }
            })
        }
        else if (viewAverageSellingPrice === true){
            fetch('http://localhost/stock_maitenance_be/public/api/update-stock',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
               
                body:JSON.stringify({
                    product_name:getName,
                    updation_type:updationType,
                    stock_value:updationAmount,
                    avg_price:averageSellingPrice
                    
                })
    
            }).then(response=>{
                return response.json()
            }).then((data)=>{
                if(data.status===true){
                    Swal.fire({
                        icon:'success',
                        text:data.message
                    })
                    setGetName('')
                    setUpdationType('')
                    setUpdatedAmount('')
                    setAverageSellingPrice('')

                    // history.push({
                    //     pathname:'/view-stock'
                    // })
    
                }
                else{
                    Swal.fire({
                        icon:'error',
                        text:data.message
                    })
                }
            })
        }

    }
    return(
        <React.Fragment>
            <Header page_name = "Product Updation"/>
            <div>
                 <div className={classess.insertion_form_setting}>
                        <form onSubmit={onSubmit} >
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Name<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                    <select className={classess.input_field_styling} required onChange={getProductNameValue} value={getName}>
                                        <option value="" disabled>Select Product Name</option>
                                        {productNameValue}
                                        
                                    </select>
                              </div>
                            
                          </div>
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Updation Type<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                              <select className={classess.input_field_styling} required onChange={getUpdationType} value={updationType}>
                                        <option value="">Select Updation Type</option>
                                        <option value="Add">Add</option>
                                        <option value="Subtract">Subtract</option>
                                    </select>
                              </div>
                            
                          </div>
                          <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Number<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="number" name="product_price" className={classess.input_field_styling} required  placeholder="Enter Updated Number..." onChange={getUpdatedStock} value={updationAmount}/>
                              </div>
                            
                          </div>
                          {
                              viewAverageSellingPrice === true? <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Average Price<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="number" name="product__avg_price" className={classess.input_field_styling} required  placeholder="Enter Selling Average Price..." onChange={getAverageSellingPrice} value={averageSellingPrice}/>
                              </div>
                            
                          </div>
                          :
                          null
                          }
                               {
                              viewPurchasingPrice === true? <div className={classess.field_div}>
                              <div className={classess.label_styling}>
                                  Purchasing Price<sup>*</sup>
                              </div>
                              <div className={classess.input_div}>
                                      <input type="number" name="product_purchasing_price" className={classess.input_field_styling} required  placeholder="Enter Product Purchasing Price..." onChange={getProductPurchasingPrice} value={CostPrice}/>
                              </div>
                            
                          </div>
                          :
                          null
                          }
                         
                          <input type="submit" name="update" value="Update Stock" className={classess.submit_button_styling}/>
                         
                        </form>
                 </div>
            </div>
        </React.Fragment>
    )
}
export default ProductUpdation