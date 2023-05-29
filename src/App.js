
import './App.css';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar/NavBar';
import imgPresentacion from'./components/ItemListContainer/assets/images/cassete-n2.webp';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Route,Routes} from "react-router-dom"
import CategoryListContainer from './components/Categories/CategoryListContainer';
import { CartProvider } from './context/CartContext';
import { Cart } from './components/Cart/Cart';
import { ProductsProvider } from './context/ProdContext';
import './firebase/firebaseConfig'
import { Order } from './components/Order/Order';




function App() { 

  return (
    
    <BrowserRouter>
      <ProductsProvider>
      <CartProvider>
        <NavBar/>
        <Routes>
          <Route path='/' element={          
            <ItemListContainer 
              greeting1 ={'Calefactores a Leña de Alto Rendimiento'}
              imgPresentacion={imgPresentacion}/>     
            }/>
          <Route path='/category/:category' element={ <CategoryListContainer/> }/>
          <Route path='/item/:idProduct' element={ <ItemDetailContainer /> }/>
          <Route path='/cart' element={ <Cart /> }/>
          <Route path='/order' element={ <Order /> }/>
        </Routes>
      </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
