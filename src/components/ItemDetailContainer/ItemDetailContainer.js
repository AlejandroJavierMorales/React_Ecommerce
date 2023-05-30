import { useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../hooks/useFirebase/useFirebase";



const ItemDetailContainer = () => {
    
    const { idProduct } = useParams()
    const {productPorId, getProductPorId, errorPromise} = useFirebase();
   

    useEffect(()=>{
        getProductPorId(idProduct)
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[idProduct]); 

    
    return (
            <div className="ItemDetailContainer container-fluid d-flex justify-content-center align-items-center text-center">
                    {errorPromise === '' ? <ItemDetail {...productPorId} /> : <p style={{color:'tomato'}}>{errorPromise}</p>} 
                     
            </div>
    )
}

export default ItemDetailContainer