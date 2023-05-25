import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Alert, Row, Col, Typography, Form } from "antd";
import axios from "axios";
import {UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const { Title } = Typography;


const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const googleAuth = async () => {
    fetch("http://localhost:8000/api/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("Authentication has failed!");
      })
      .then(async (resObject) => {
        const user = resObject.user;

        const username = user.displayName;
        const password = user.id;

        dispatch({ type: "LOGIN_START" });
        try {
          const res = await axios.post(
            "http://localhost:8000/api/auth/login",
            { username, password },
            { withCredentials: true }
          );
          if (res.data.isAdmin) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            window.open("/", "_self");
          } else {
            dispatch({
              type: "LOGIN_FAILURE",
              payload: { message: "You are not allowed!" },
            });
          }
        } catch (err) {
          dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const google = async () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
    googleAuth();
  };

  return (
    <div className="login">
      <Title className="loginTitle">Choose a Login Method</Title>
      <Row justify="center">
        <Col>
          <Button className="loginButton google" onClick={google}>
            <GoogleOutlined className="icon" />
            Google
          </Button>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <div className="or">
            <h3>OR</h3>
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <Form>
            <Form.Item>
              <Input
                prefix={<UserOutlined />}
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={loading}
                onClick={handleClick}
                className="submit"
                type="primary"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          {error && <span>{error.message}</span>}
        </Col>
      </Row>
    </div>
  );
};

export default Login;
