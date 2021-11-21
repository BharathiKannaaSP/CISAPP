import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import styled from "styled-components";
import React from "react";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255,.5),
      rgba(255, 255, 255,.5)
    ),
    url("https://img.freepik.com/free-vector/cake-pattern-background_1340-961.jpg?size=338&ext=jpg")center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);

  const [orderId, setOrderId] = useState(null);
const history =useHistory("")

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
   // eslint-disable-next-line
  }, [cart, data, currentUser]);

  return (
        <>
        <Container>
        <div
            style={{
                height:"100vh",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
            }}
            >

            <div
                style={{
                    border:"none",
                    width:120,
                    padding:"100px",
                    backgroundColor:"teal",
                    color:"white",
                    fontSize:"30px",
                    fontWeight:"600",
                    cursor:"pointer",
                }}
                >
                    Successfull!
                </div>
                <div
                style={{
                    border:"none",
                    width:120,
                    borderRadius:5,
                    padding:"100px",
                    backgroundColor:"#7A9798",
                    color:"white",
                    fontSize:"20px",
                    fontWeight:"500",
                    cursor:"pointer",
                }}
                >
                   {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <button onClick={()=>history.push('/')} style={{backgroundColor:"teal",cursor:"pointer", padding: 10, marginTop: 20,color:"white",border:"none" }}>Go to Homepage</button>
                </div>
                </div>
                
        
        </Container>
       
        
         </>
    )
}



  
export default Success;
