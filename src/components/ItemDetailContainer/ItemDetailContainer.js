import { useEffect, useState } from "react";
import { getProductsById } from "../../asyncMock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";



const ItemDetailContainer = () => {
    
    const [product, setProduct] = useState(null)
    const { idProduct } = useParams()

    

    useEffect(()=>{
        getProductsById(parseInt(idProduct))
            .then(response => {
                setProduct(response)
            })
            .catch(error=>{
                console.error(+error)
            })
    },[idProduct]);
    
    return (
            <div className="ItemDetailContainer container-fluid d-flex justify-content-center align-items-center">
                    <ItemDetail {...product} />  
            </div>
    )
}

export default ItemDetailContainer