import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
    //eslint-disable-next-line
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={()=>history.push('/')} >CONTINUE SHOPPING</TopButton>
         
          
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    
                    <ProductAmount>{product.quantity}</ProductAmount>
                   
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
           
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Cake n Bake"
              image="data:image/png;base64,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"
              billingAddress
              shippingAddress
              description={`Your total is ₹${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
