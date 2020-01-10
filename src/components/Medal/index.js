import React, { Component } from "react";
import { Card, Button, Icon, Row, Col, Input } from 'antd';
import platinum from '../../assets/images/platinum.svg';
import gold from '../../assets/images/gold.svg';
import silver from '../../assets/images/silver.svg';
import "./index.less"
import state from "../../Store";

const { Meta } = Card;

export default class Medal extends Component {

  imgSrc = title => {
    if(/白金/.test(title)) {
      return platinum
    }else if(/金/.test(title)) {
      return gold
    }else if(/银/.test(title)) {
      return silver
    }
  }

  initMetaTitle = item => {
    if(item?.editingKey) {
      return <Input value={item.simplifiedName} onChange={e => this.inputChange(item, e.target.value)} />
    }else {
      return item.simplifiedName
    }
  }

  inputChange = (item, value) => {
    item.simplifiedName = value;
    this.forceUpdate();
  }

  edit = item => {
    item.editingKey = true;
    this.forceUpdate();
  }

  save = item => {
    item.editingKey = false;
    state.updateStorageLevelName(item);
    this.forceUpdate();
  }


  render() {
    const { dataSource } = this.props;
    return (
      <Row className="level">
        {
          dataSource.map((item, index) => {
            let src = this.imgSrc(item.simplifiedName);
            return  <Col span={6} key={index}>
              <Card className="level-card"
                actions={[
                  item.editingKey ? <Icon onClick={() => this.save(item)} type="check" key="check" /> : <Icon onClick={() => this.edit(item)} type="edit" key="edit" />,
                  <Icon onClick={() => state.deleteStorageLevel(item)} type="delete" key="delete" />,
                ]}
              >
                <Meta
                  avatar={<img src={src} alt={item.simplifiedName} width="34" />}
                  title={this.initMetaTitle(item)}
                />
              </Card>
            </Col>
          })
        }
        <Col span={6}>
          <Button className="plus" type="dashed" icon="plus" />
        </Col>
      </Row>
    )
  }
}