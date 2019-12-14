import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cart from "./cart/Cart";
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;


ReactDOM.render([
    <div>
        <Layout style={{height: window.innerHeight}}>
            <Header style={{backgroundColor: "lightblue"}}><Title>Pet shop</Title></Header>
            <Layout>
                <Content><App/></Content>
                <Sider style={{backgroundColor: "lavender"}}><Cart/></Sider>
            </Layout>
            <Footer> Footer </Footer>
        </Layout>
    </div>,
    ], document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
