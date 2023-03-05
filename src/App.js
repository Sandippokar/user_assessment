import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Loader from "./Loader";
import User from "./User";
import { Col, Row } from "antd";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try{
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      if (res.status === 200) {
        setUsers(res.data);
      } else {
        console.log("Data Not Found!");
      }
    }catch(error){
      console.log(Object.keys(error), error.message);
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter((entry) => entry.id !== id));
  };

  const updateUserData = (id, value) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return { ...user, ...value };
        } 
        return user;  
      })
    );
  };

  if (users.length === 0) {
    return <Loader />;
  }

  return (
    <Row>
      {users.map((user) => (
        <Col xs={24} sm={24} md={8} lg={8} xl={6} key={user.username}>
          <User user={user} updateUserData={updateUserData} deleteUser={deleteUser}  />
        </Col>
      ))}
    </Row>
  );
};

export default App;
