import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import classess from './style.module.css'
const StockInfo = (props) =>{
    const history = useHistory();
    const LogOut = () =>{
        sessionStorage.setItem('login',false)
        history.push('/')
    }
    return(
        <React.Fragment>
            {
                sessionStorage.getItem('login') !== 'false'?<React.Fragment>
                    <div className = {classess.login_user_div}>
                            <div className={classess.login_user_name}>
                                {/* {props.location.state.login_name} */}
                                {sessionStorage.getItem('login_name')}
                                <span className={classess.log_out_button} onClick={LogOut}>
                                    LogOut
                                </span>
                            </div>
                        
                        
                        </div>
                        <div className={classess.main_div}>
                        <Link to = "/product-insertion" className="link_color">
                            <div className={classess.outer_div}>
                                <div className={classess.product_insertion}>
            
                                            Product Insertion
                                        
                                </div>
                            
                            </div>
                            </Link>
                            <Link to = "/product-updation" className="link_color">
                                <div className={classess.outer_div}>
                                    <div className={classess.stock_updation}>
                                            Stock Updation
                                    </div>
                                
                                </div>
                            </Link>
                         <Link to ="/view-stock" className="link_color">
                            <div className={classess.outer_div}>
                                <div className={classess.view_stock}>
                                        View Stock
                                </div>
                                
                            </div>
                        </Link>
                     </div>
                </React.Fragment>
                :
                <React.Fragment>
                   {
                       history.push('/')
                   }
                </React.Fragment>
               
                
                
            }
            
        </React.Fragment>
    )
}
export default StockInfo