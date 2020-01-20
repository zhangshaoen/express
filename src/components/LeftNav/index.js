import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Menu } from 'antd';
import TREEJSON from "../../config/treeConfig";
import state from '../../Store';
import { getQueryVariable } from '../../utils/getQueryVariable';

const { SubMenu } = Menu;

@observer
class LeftNav extends Component {

  getMenuNodes = menuConfig => {
    return menuConfig.map((item, index) => {
      // home ID 为 null
      let key = item.id ? item.id : "home";
      if (!item.childrens) {
        let itemKey = "/404";
        if (TREEJSON[item.key]) itemKey = TREEJSON[item.key];
        return (
          <Menu.Item key={key}>
            <Link to={`${itemKey}?id=${item.id}`} onClick={() => state.linkClick(item)}>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        let subKey = "/404";
        if (TREEJSON[item.key]) subKey = TREEJSON[item.key];
        return (
          <SubMenu
            key={key}
            title={
              <Link to={`${subKey}?id=${item.id}`} onClick={() => state.linkClick(item)}>
                <span>{item.title}</span>
              </Link>
            }
          >
            {this.getMenuNodes(item.childrens)}
          </SubMenu>
        )
      }
    })
  }

  UNSAFE_componentWillMount() {
    let { pathname, id } = getQueryVariable(this, "id");
    // 获取左侧树
    state.getLeftTree(id);     
    if(pathname === "/home" && (!id || id === "null" || id === "home")){
      // 获取 数据中心资源总数及占比  和  各个数据中心设备占比
      state.getHomeCharts();
    }
  }

  render() {
    return (
      <Menu
        mode="inline"
        theme="light"
        inlineIndent={15}
        openKeys={state.openKeys}
        selectedKeys={state.selectedKeys}
        style={{ borderColor: "transparent" }}
      >
        {this.getMenuNodes(state.leftTree)}
      </Menu>
    );
  }
}

export default withRouter(LeftNav)
