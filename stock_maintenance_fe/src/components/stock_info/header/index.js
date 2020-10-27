import React from 'react'
import { Link } from 'react-router-dom'
import classess from './style.module.css'
const Header = (props) =>{
    return(
        <React.Fragment>
            <div className={classess.header_div}>
                <div className={classess.header_page_name}>
                    {props.page_name}
                </div>
                <div className={classess.header_item}>
                        <Link to = "/product-info" className="link_color">Back</Link>
                </div>
                
            </div>

        </React.Fragment>
    )
}
export default Header