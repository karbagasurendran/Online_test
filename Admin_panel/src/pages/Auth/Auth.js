import {Col,Nav,Row,Tab} from 'react-bootstrap';
import Login from './login';

function LeftTabsExample() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Login />
      </Row>
    </Tab.Container>
  );
}

export default LeftTabsExample;