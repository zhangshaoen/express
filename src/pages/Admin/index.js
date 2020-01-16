import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import state from "../../Store";
import urlBase from '../../config/urlBase';
import HeaderNav from '../../components/HeaderNav';
import NotDeveloped from '../NotDeveloped';
import Pool from './Pool';
import SanStorageDevice from '../SanStorageDevice';
import Acquisition from '../Acquisition';
import NasStorageDevice from '../NasStorageDevice';
import FiberSwitchManagement from "../FiberSwitchManagement";
import StorageManagement from "../StorageManagement";

import "../../assets/less/index.less";


@observer
class Admin extends Component {
  render() {
    return (
      <Layout className="layout">
        <HeaderNav />
        <Breadcrumb separator=">" className="breadcrumb">
          <Breadcrumb.Item>服务目录</Breadcrumb.Item>
          {   
            // 面包屑随 headerNav 变化
            toJS(state.breadcrumbList).map((item, index) => {
              return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            })
          }
        </Breadcrumb>
        <Switch>
          <Route path={`${urlBase}/404`} component={NotDeveloped} />
          {/* SAN存储设备管理 */}
          <Route path={`${urlBase}/sanStorageDevice`} component={SanStorageDevice} />
          {/* 定时数据采集 */}
          <Route path={`${urlBase}/acquisition`} component={Acquisition} />
          {/* NAS存储设备管理 */}
          <Route path={`${urlBase}/nasStorageDevice`} component={NasStorageDevice} />
          {/* 光纤交换机管理 */}
          <Route path={`${urlBase}/fiberSwitchManage`} component={FiberSwitchManagement} />
          {/* 存储管理机管理 */}
          <Route path={`${urlBase}/StorageManagement`} component={StorageManagement} />
          {/* 存储资源池 */}
          <Route path={`${urlBase}/home` } component={Pool} />
          <Redirect to={`${urlBase}/home`} />
        </Switch>
      </Layout>
    );
  }
}

export default Admin;
