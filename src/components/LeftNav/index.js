import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Menu } from 'antd';
import TREEJSON from "../../config/treeConfig";
import state from '../../Store';
import { getQueryVariable } from '../../utils/getQueryVariable';
import { filterSubValue } from '../../utils/filterSubValues';
import { getProperty } from '../../utils/getProperty';

const { SubMenu } = Menu;

@observer
class LeftNav extends Component {

  state = {
    defaultSelectedKeys: [],  // 左侧树选中项
    defaultOpenKeys: [],  // 初始展开的 SubMenu 菜单项
  }

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
    const { pathname, id } = getQueryVariable(this, "id");
    // 获取左侧树
    state.getLeftTree(pathname, id).then(() => {
      // 左侧导航默认展开
      let defaultSelectedKeys = [id];
      let defaultOpenKeys = [];
      if (id && id !== "null") {
        defaultOpenKeys = toJS(filterSubValue(getProperty(state.leftTree, "id"), "id", id).parent);
        defaultOpenKeys[0] = "home";
      }else if (id === "null") {
        defaultSelectedKeys = ["home"];
        defaultOpenKeys = ["home"];
      }
      this.setState({ defaultSelectedKeys, defaultOpenKeys })
    });
    // 获取 数据中心资源总数及占比  和  各个数据中心设备占比
    state.getHomeCharts();

  }

  render() {
    return (
      <Menu
        mode="inline"
        theme="light"
        inlineIndent={15}
        defaultOpenKeys={this.state.defaultOpenKeys}
        defaultSelectedKeys={this.state.defaultSelectedKeys}
        style={{ borderColor: "transparent" }}
      >
        {this.getMenuNodes(state.leftTree)}
      </Menu>
    );
  }
}

export default withRouter(LeftNav)
