import { Container, Nav, Navbar } from 'react-bootstrap'
import './UserAccount.css'
import { useAuthContext } from '../../hooks/useAuthContext/useAuthContext';
import { useFirebaseClient } from '../../services/hooks/useFirebase/useFirebaseClient';
import { useClientContext } from '../../hooks/useClientContext/useClientContext';
import { useFirebase } from '../../services/hooks/useFirebase/useFirebase';
import { useProductsContext } from '../../hooks/useProductsContext/useProductsContext';
import { User } from '../../components/basics/User/User';
import viewDetailImg from '../../assets/img/icons/list-search.png'
import cartImg from '../../assets/img/icons/carrito.png'
import { useEffect } from 'react';

const UserAccount = () => {

    const { emailAuth } = useAuthContext();
    const { getClient } = useFirebaseClient();
    const { client } = useClientContext();
    const { getOrdersUser, ordersUser, getOrderDocument, orderDoc } = useFirebase();
    const { setPageIndex, page } = useProductsContext();


    const handlePerfil = (e) => {
        e.preventDefault();
        setPageIndex('userAccountPerfil');
        getClient('email', emailAuth)
        let navbar = document.querySelector(".navbarToggleAccount");
        navbar.click();

    }

    const handleMisCompras = (e) => {
        e.preventDefault();
        setPageIndex('userAccountMisCompras');
        getOrdersUser(emailAuth)
        let navbar = document.querySelector(".navbarToggleAccount");
        navbar.click();
    }

    const handleViewOrderDetail = (orderNumber, e) => {
        e.preventDefault();
        setPageIndex('UserOrderDetail');
        getOrderDocument(orderNumber);
    }

    useEffect(() => {
        setPageIndex('userAccountPerfil');
        getClient('email', emailAuth)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 


    return (

        <>
            <div className="container-fluid border rounded mt-3 text-center p-0  accountContainer">
                <div className='row d-flex flex-column justify-content-start align-items-center'>
                    <div className='col-12 text-start pt-3 navbarAccountContainer d-flex justify-content-start'>
                        <Navbar className='navBarContainer navbarAccount' expand="md">
                            <Container className='container-fluid navbarContenedor' >
                                <Navbar.Toggle className='navbarToggleAccount' aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="">
                                        <Nav.Link href="#" onClick={(e)=>handlePerfil(e)}>Ver Perfil</Nav.Link>
                                        <Nav.Link href="#" onClick={(e)=>handleMisCompras(e)}>Mis Compras</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                    <div className='col-12 text-center pb-3 font-bold'> <span className='pe-1'><b>Usuario:</b></span>{emailAuth}</div>
                    <div className='col-11 bodyAccountContainer text-center d-flex justify-content-center'>
                        {/* Visualizacion del Perfil de Usuario */}
                        {(client?.email && page === 'userAccountPerfil') && <User client={client} />}

                        {/* Visualizacion detalle de Compras Realizadas */}
                        {
                            (ordersUser?.length === 0 && page === 'userAccountMisCompras') ? (<><div className='p-4 pt-5' style={{color:'tomato'}} >No ha registrado compras por el momento...</div></>) : ( page === 'userAccountMisCompras' && (<>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>FECHA</th>
                                            <th>NRO. DE ORDEN</th>
                                            <th> MONTO TOTAL</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ordersUser?.map(order => (
                                            <tr key={order.id}>
                                                <td>{`${(order?.date.toDate().toLocaleDateString('ES'))}`} </td>
                                                <td>{order?.order_number}</td>
                                                <td>{`$${order?.total}`}</td>
                                                <td><img onClick={(e) => handleViewOrderDetail(order?.order_number, e)} src={viewDetailImg} className="img-fluid imgViewDetailOrder" alt="icono ver detalle" style={{ width: 26 }} data-toggle="tooltip" title="Ver Detalle" /></td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </>))
                        }
                        {/* Visualizacion del detalle de Orden de Compra Seleccioneda */}
                        {page === 'UserOrderDetail' && (<>



                            <div className='row tableOrderDetailContainer d-flex justify-content-center '>
                                <div className='headerOrderDetail row d-flex justify-content-center align-items-center col-10 pb-3' >
                                    <div className='col-5 divOrderNumber rounded'>Orden de pedido No.{orderDoc?.order_number}</div>
                                    <div className='col-5'>
                                        <button className='btn btn-secondary'>Volver a Comprar <img src={cartImg} className="img-fluid m-1" alt="icono Carrito de compras" style={{ width: 26 }} data-toggle="tooltip" title="Cargar en el Carrito" /> </button>
                                    </div>
                                </div>
                                <table className="table table-striped ">
                                    <thead>
                                        <tr>
                                            <th>PRODUCTO</th>
                                            <th>CANT</th>
                                            <th>PRECIO</th>
                                            <th>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(orderDoc?.items) && (orderDoc.items.map(item => (
                                            <tr key={item.id}>
                                                <td className="tdProducto"><img src={item.img} alt={item.name} style={{ width: 50 }} />{item.name}</td>
                                                <td >{item.quantity}</td>
                                                <td >{`${parseFloat(item.price)}`}</td>
                                                <td >{` $ ${parseFloat(item.price) * parseInt(item.quantity)}`}</td>
                                            </tr>
                                        )))}
                                        <tr>


                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </>)



                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export { UserAccount }