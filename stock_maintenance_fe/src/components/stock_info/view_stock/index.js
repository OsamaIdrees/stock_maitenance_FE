import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../header/index'
import classess from './style.module.css'
import Swal from 'sweetalert2'

const ViewStock = () =>{
    const history = useHistory()
    const productName = []
    const [productNameValue,setProductNameValue] = React.useState('')
    const [selectValue,setSelectValue] = React.useState('')
    const [productId,setProductId] = React.useState('')
    const [Name,setName] = React.useState('')
    const [productPrice,setProductPrice] = React.useState('')
    const [productStock,setProductStock] = React.useState('')
    const [upatedAt,setUpdatedAt] = React.useState('')
    const [tableShow,setTableShow] = React.useState(false)
    const [showRevenue,setShowRevenue] = React.useState(false)
    const [perDaySale,setPerDaySale] = React.useState('')
    const [stockIn,setStockIn] = React.useState('')
    const [profitHistory,setProfitHistory] = React.useState('')
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
    const getSelectValue = (e)=>{
        setSelectValue(e.target.value)
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        fetch('http://localhost/stock_maitenance_be/public/api/view-stock',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                product_name:selectValue
            })
        }).then(response=>{
            return response.json()
        }).then((data)=>{
            console.log(data)
           if(data.status === true){
               const store_in = []
               setTableShow(true)
               data['product_detail'].map(detail=>{
                setProductId(detail['id'])
                setName(detail['product_name'])
                setProductPrice(detail['product_price'])
               })
               data['stock_info'].map(stock=>{
                   setProductStock(stock['stock'])
                   setUpdatedAt(stock['updated_at'])
                   
               })
             data['stock_in_record'].map(stock_in=>{
                 store_in.push(<tr className={classess.row_styling}>
                     <td>
                         {
                             stock_in['stock_in']
                         }
                     </td>
                     <td>
                         {stock_in['cost_price']}
                     </td>
                     <td>
                         {stock_in['Date']}
                     </td>
                 </tr>)
             })
               setStockIn(store_in)
           }
           if(data.sub_result === true){
               const temp = []
               const hold_profit_record = []
                data['product_sell_record'].map(result=>{
                    setShowRevenue(true)
                    hold_profit_record.push(<tr className={classess.row_styling}>
                        <td>
                            {result['sell_record']}
                        </td>
                        <td>
                            {result['revenue_earned']}
                        </td>
                        <td>
                            {result['profit_earned']}
                        </td>
                        <td>
                            {result['last_updated']}
                        </td>
                    </tr>)
               
                })
                setProfitHistory(hold_profit_record)
                data['per_day_sale'].map(per_day_sale=>{
                    
                    
                    temp.push(<tr className={classess.row_styling}>
                        <td>
                            {per_day_sale['stock_sell']}
                        </td>
                        <td>
                            {per_day_sale['average_price']}
                        </td>
                        <td>
                            {per_day_sale['Date']}
                        </td>
                    </tr>
                    )
                 
                
                })
                setPerDaySale(temp)
                
           }
        })
      
    }
    return(
        <React.Fragment>
            <Header page_name="View Stock"/>
            <div className={classess.main_div}>
                <form onSubmit={onSubmit}>
                    <select className={classess.select_type_styling} value={selectValue} onChange={getSelectValue}>
                        <option value="" disabled>Select Produt </option>
                        {productNameValue}
                    </select>
                    <input type="submit" value ="View" name="submit" className={classess.submit_button_styling}/>
                </form>
            </div>
            {
                tableShow === true?
                <React.Fragment>
                <div className={classess.table_div}>
                <table rules="cols" className={classess.table_styling}>
                    <tr className={classess.heading_styling}>
                        <th>
                            Id
                        </th>
                        <th>
                            Product Name
                        </th>
                        <th>
                            Product Price
                        </th>
                        <th>
                            Stock
                        </th>
                        <th>
                            Last Updated
                        </th>
                    </tr>
                    <tr className={classess.row_styling}>
                        <td>
                            {productId}
                        </td>
                        <td>
                            {Name}
                        </td>
                        <td>
                            {productPrice}
                        </td>
                        <td>
                            {productStock}
                        </td>
                        <td>
                            {upatedAt}
                        </td>
                    </tr>
                </table>
            </div>
            <div className={classess.heading_style}>
                                 Stock In Record
            </div>
            <div className={classess.table_div}>
                <table rules="cols" className={classess.table_styling}>
                    <tr className={classess.heading_styling}>
                        <th>
                            Stock In
                        </th>
                        <th>
                            Cost  Price
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>
                        {stockIn}
                    
                </table>
            </div>
           </React.Fragment> 

            :
            null
            }
          
              {
                showRevenue === true?<React.Fragment>
                      <div className={classess.heading_style}>
                                 Sale & Revenue (Monthy)
                     </div>
                    <div className={classess.table_div}>
                <table rules="cols" className={classess.table_styling}>
                    <tr className={classess.heading_styling}>
                        <th>
                            Item Sell
                        </th>
                        <th>
                            Revenue Earned 
                        </th>
                        <th>
                            Profit Earned
                        </th>
                        <th>
                            Last Updated
                        </th>
                    </tr>
                    {profitHistory}
              
                </table>
            </div>
            <div className={classess.heading_style}>
                                 Per Day Sale Record
                     </div>
                    <div className={classess.table_div}>
                <table rules="cols" className={classess.table_styling}>
                    <tr className={classess.heading_styling}>
                        <th>
                            Item Sell
                        </th>
                        <th>
                            Average Selling Price 
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>
                  {perDaySale}
                 
                </table>
            </div>
            </React.Fragment>

            :
            null
            }
     
        </React.Fragment>
    )
}
export default ViewStock