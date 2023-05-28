import { useContext, useEffect, useState } from 'react';
import './FormClient.css'
import { useFirebase } from '../../hooks/useFirebase/useFirebase';
import { CartContext } from '../../context/CartContext';

const FormClient = ()=>{

    const {setOrderDocument} = useFirebase();
    
    const {cart} = useContext(CartContext);
    const [itemsCart, setItemsCart] = useState([]);
    const [order, setOrder] = useState({
            order_number:'',
            date:'',
            name:'',
            phone:'',
            email:'',
            total:'',
            items:[{}]
    })

    const [email,setEmail]=useState({
        email1:'',
        email2:''
    })

    const [btnOrder, setBtnOrder] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    
    const handleEmail = ()=>{

            const value = email.email1;
          
            // eslint-disable-next-line no-useless-escape
            if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value)){
                setErrorEmail(false);
                /* console.log(email.email1+"  "+email.email2) */
                email.email1===email.email2 ? setBtnOrder(true):setBtnOrder(false);
            } else {
            setErrorEmail(true);
            /* email.email1===email.email2 ? setBtnOrder(true):setBtnOrder(false);
            console.log(email.email1+"  "+email.email2) */
            }
            
    }
    const handleOnclick = (e)=>{
        e.preventDefault()
        console.log("generar Orden de Pedido");
        

        const items = cart.map(item => ({
                idprod:item.id,
                name:item.name,
                img:item.img,
                price:item.price,
                quantity:item.quantity,
                total: (parseFloat(item.price) * parseInt(item.quantity))            
    }) )
        console.log(items.length)
        console.log(items)
        console.log(items[0].name)
        setItemsCart(items)
        
        let totalOrder =0;

         items.forEach(element => {
          totalOrder += element.total
        }); 
        console.log(totalOrder)
        
        
        setTimeout(()=>{
          setOrder(prev => ({...prev,
        email : email.email1,
        items : cart,
        total: totalOrder
        }));
        console.log(order);
        console.log(itemsCart)  
        setOrderDocument(order);
    
    },1000)
        
         
    
    }

    useEffect(()=>{
        handleEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[email])

    useEffect(()=>{
        
    },[])

    return(
        <div className="container text-center ">
            <h5 className="titulo">Ingrese sus datos personales para Confirmar su Compra</h5>
            <form onSubmit={handleOnclick}>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-8 pt-2 d-flex">
                        <label className="rounded w-50 h-50 text-start" htmlFor="name">Nombre y Apellido</label>
                        <input 
                            className="rounded w-100 h-50 text-center" 
                            type="text" 
                            name="name" 
                            id="name" 
                            onChange={(e) => {
                                setOrder(prev=>({...prev, name:e.target.value}));
                                }}    
                        />
                    </div>
                    <div className="col-4 pt-2 d-flex">
                        <label className="rounded w-50 h-50 text-start" htmlFor="phone">Teléfono</label>
                        <input 
                            className="rounded w-100 h-50 text-center" 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            onChange={(e) => {
                                setOrder(prev=>({...prev, phone:e.target.value}));
                                }}
                        />
                    </div>
                </div>  
                <div className="emailContainer container row d-flex justify-content-center align-items-center pt-5">
                    {/* <div className='col12'>{errorEmail ? <p>El Correo ingresado es Incorrecto</p> : <p></p>} </div> */}
                    <div className="col-12 d-flex  justify-content-center align-items-center ">
                        <div className="col-3">
                            <label className="rounded w-100 h-50 text-end pe-2" htmlFor="email">E-mail</label>
                        </div>
                        <div className="col-9">
                            <input
                                onChange={(e) => {
                                    setEmail(prev=>({...prev, email1:e.target.value}));
                                    }}
                                className="rounded w-100 h-50 text-center" 
                                type="email" 
                                name="email1" 
                                id="email1" 
                                value={email.email1}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-center mt-2">
                        <div className="col-3">
                            <label className="rounded w-100 h-50 text-end mt-2 mb-4 pe-2" htmlFor="email2">Confirmar de E-mail</label>
                        </div>
                        <div className="col-9">    
                            <input 
                                onChange={(e) => {
                                    setEmail(prev=>({...prev, email2:e.target.value}));
                                    }}
                                className="rounded w-100 h-50 mt-2 mb-4 text-center" 
                                type="email" 
                                name="email2" 
                                id="email2"
                                value={email.email2}
                                />
                        </div>
                    </div>
                    
                </div>
                    <div>
                        {btnOrder && !errorEmail ? (<button  className='btn btn-secondary mb-4 w-100'>Confirmar Compra</button>) 
                        : (<></>)}
                     </div>   
                    <div>
                        <p className='msgOrder'>Su Código de Orden de Pedido es 000-001</p>
                    </div>
            </form>
        </div>
    )
}
export {FormClient}