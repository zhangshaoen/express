/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import state from "../../Store";
import { Layout, Row, Col, Menu, Icon } from 'antd';
import headerMenuList from '../../config/haderMenuConfig';
import "./index.less"
import logo from "../../assets/images/logo.png"

const { Header } = Layout;
const { SubMenu } = Menu;

@observer
class HeaderNav extends Component {

  getMenuNodes = menuConfig => {
    return menuConfig.map(item => {
      if (!item.childrens) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key} onClick={() => { state.headerMenuClick(item) }}>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.childrens)}
          </SubMenu>
        )
      }
    })
  }

  UNSAFE_componentWillMount() {
    const path = this.props.location.pathname;    
    state.breadcrumbByUrl(path);
  }


  render() {
    let path = this.props.location.pathname;
    if(/\/home/.test(path)) {
      path = "/home";
    }
    return (
      <Header className="header">
        <Row>
          <Col span={4}>
            <img className="logo" src={logo} />
          </Col>
          <Col span={8}>
            <Menu selectedKeys={[path]} mode="horizontal" className="menu">
              {this.getMenuNodes(headerMenuList)}
            </Menu>
          </Col>
        </Row>

      </Header>
    );
  }
}

export default withRouter(HeaderNav)
