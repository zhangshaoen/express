import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer } from 'mobx-react';
import state from "../../Store";
import urlBase from '../../config/urlBase';
import { Layout } from 'antd';
import LeftNav from '../../components/LeftNav';
import ScrollToTop from "../../components/ScrollToTop"
import Home from '../Home';
import Base from '../Base';
import Storage from '../Storage';
import ResourcePool from '../ResourcePool';
import Resource from '../Resource';
import Unit from '../Unit';
import SanDevice from '../SanDevice';
import NasDevice from '../NasDevice';
import SwitchPage from '../SwitchPage';
import SwitchUnit from '../SwitchUnit';
import SwitchFabric from '../SwitchFabric';
import SwitchZone from '../SwitchZone';
import SwitchPhysics from '../SwitchPhysics';

import "../../assets/less/index.less";

const { Sider, Content } = Layout;

@observer
class Pool extends Component {

  UNSAFE_componentWillMount() {
    const path = this.props.location.pathname;
    state.breadcrumbByUrl(path);
  }

  render() {
    return (
      <Layout className="inner-layout">
        <Sider theme="light" className="sider" width={280}>
          <LeftNav />
        </Sider>
        <Content className="content" id="content">
          <ScrollToTop>
            <Switch>
              <Route path={`${urlBase}/home` } exact component={Home} key={this.props.location.search} />
              <Route path={`${urlBase}/home/base` } component={Base} key={this.props.location.search} />
              <Route path={`${urlBase}/home/san` } exact component={Storage} key={this.props.location.search} />
              <Route path={`${urlBase}/home/nas` } exact component={Storage} key={this.props.location.search} />
              <Route path={`${urlBase}/home/san/resourcePool`} component={ResourcePool} key={this.props.location.search} />
              <Route path={`${urlBase}/home/nas/resourcePool`} component={ResourcePool} key={this.props.location.search} />
              <Route path={`${urlBase}/home/san/resource`} component={Resource} key={this.props.location.search} />
              <Route path={`${urlBase}/home/nas/resource`} component={Resource} key={this.props.location.search} />
              <Route path={`${urlBase}/home/san/unit`} component={Unit} key={this.props.location.search} />
              <Route path={`${urlBase}/home/nas/unit`} component={Unit} key={this.props.location.search} />
              <Route path={`${urlBase}/home/sanDevice`} component={SanDevice} key={this.props.location.search} />
              <Route path={`${urlBase}/home/nasDevice`} component={NasDevice} key={this.props.location.search} />
              <Route path={`${urlBase}/home/switchPage`} component={SwitchPage} key={this.props.location.search} />
              <Route path={`${urlBase}/home/switchUnit`} component={SwitchUnit} key={this.props.location.search} />
              <Route path={`${urlBase}/home/switchFabric`} component={SwitchFabric} key={this.props.location.search} />
              <Route path={`${urlBase}/home/switchZone`} component={SwitchZone} key={this.props.location.search} />
              <Route path={`${urlBase}/home/switchPhysics`} component={SwitchPhysics} key={this.props.location.search} />
            </Switch>
          </ScrollToTop>
        </Content>
      </Layout>
    );
  }
}

export default  Pool;