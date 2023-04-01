import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import data from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const addToCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index === -1) {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += 1;
      setCartItems(newCartItems);
    }
  };

  const removeFromCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      if (newCartItems[index].quantity === 1) {
        newCartItems.splice(index, 1);
      } else {
        newCartItems[index].quantity -= 1;
      }
      setCartItems(newCartItems);
    }
  };

  const deleteFromCart = (product) => {
    const index = cartItems.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
    }
  };

  return (
    <div className="container containerss">
      <h1 className="hss">Food Shopping Cart</h1>
      <div>
        <input class="inputs" type="text" value={searchTerm} onChange={handleSearch} />
        <Button variant="primary">Search</Button>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            {filteredItems.map((product) => (
              <div className="col-md-4 mb-3" key={product.id}>
                <Card className="car">
                  <Card.Img className="img" variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.category}</Card.Text>
                    <Card.Text>{product.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </Button>{" "}
                    <Button
                      variant="secondary"
                      onClick={() => removeFromCart(product)}
                    >
                      Subtract
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-4 mb-3 shops">
          <h2 className="heads">Bought Items</h2>
          {cartItems.length === 0 ? (
            <p className="heads">Buy Now!</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>
                    {item.name} ({item.quantity}){" "}
                    <Button
                      className="butts"
                      variant="danger"
                      onClick={() => deleteFromCart(item)}
                    >
                      Delete
                    </Button>
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
