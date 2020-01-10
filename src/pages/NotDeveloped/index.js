import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Result, Button } from 'antd';

class NotDeveloped extends Component {

  handleClick = () => {
    this.props.history.replace("/home");
  };

  render() {
    return (
      <Card bodyStyle={{padding: "16px 0"}}>
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={this.handleClick} type="primary">Back Home</Button>}
      />
      </Card>
    );
  }
}

export default withRouter(NotDeveloped)
  ;
