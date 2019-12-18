import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import { Layout } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;
const { Header, Footer } = Layout;

ReactDOM.render([
    <div className="App">
        <Layout style={{height: window.innerHeight}}>
            <Header style={{backgroundColor: "lightblue"}}><Title>Pet shop</Title></Header>
            <Layout>
                <App/>
            </Layout>
            <Footer> Footer </Footer>
        </Layout>
    </div>
    ], document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
