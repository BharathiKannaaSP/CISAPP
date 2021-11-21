import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import {format} from "timeago.js"
import styled from "styled-components"


export default function WidgetLg() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
    
  }, []);

const [filters, setFilters] = useState({});
const Option = styled.option``;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
 const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Orders</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order,products) => (
          <tr className="widgetLgTr" key={order._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{order.userId}</span>
            </td>
            <td>
             <span className="widgetLgName" style={{fontSize:"15px",padding:"10px"}}>{order._id}</span>
             
             </td>
            <td className="widgetLgDate">{format(order.createdAt)}</td>
            <td className="widgetLgAmount">₹{order.amount}</td>
            <td className="widgetLgStatus">
              <Button type={order.status} />
               <Select name="status" onChange={handleFilters}>
            <Option disabled>Food Status</Option>
            <Option>Ordered</Option>
            <Option>Preparing</Option>
            <Option>Prepared</Option>
            <Option>Out for delivery</Option>
            <Option>Delivered</Option>
          </Select>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
