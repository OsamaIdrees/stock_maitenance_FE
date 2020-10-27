import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import MainPage from './components/main_page/index'
import StockInfo from './components/stock_info/index'
import ProductInserttion from './components/stock_info/product_insertion/index';
import ProductUpdation from './components/stock_info/product_updation/index'
import ViewStock from './components/stock_info/view_stock/index'
const App = () =>{
  return (
  <BrowserRouter>
      <div className="App">
          <Switch>
            <Route exact path = "/" component = {MainPage} />
            <Route exact path = "/product-info" component = {StockInfo}/>
            <Route exact path = "/product-insertion" component={ProductInserttion}/>
            <Route exact path = "/product-updation" component={ProductUpdation}/>
            <Route exact path = "/view-stock" component={ViewStock}/>
          </Switch>
      </div>
  </BrowserRouter>

  );
}

export default App;
