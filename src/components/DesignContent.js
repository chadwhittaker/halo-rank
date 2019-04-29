import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import TabContainer from 'react-bootstrap/TabContainer';
// import TabContent from 'react-bootstrap/TabContent';
// import TabPane from 'react-bootstrap/TabPane';

import DesignLocation from './DesignLocation';
import DesignLoad from './DesignLoad';
import DesignDesign from './DesignDesign';
import DesignSolarAnnual from './DesignSolarAnnual';
import DesignSolarDaily from './DesignSolarDaily';
import DesignCost from './DesignCost';


class DesignContent extends React.Component {
  state = { key: 'location' }

  componentDidMount() {
    // generate all design data based on query results
    this.props.value.generateDesignData(this.props.queryData);
  }

  render() {
    return (
      <DesignContextConsumer>
        {(value) => {
          // contains latest design data to print to screen
          console.log(value)

          return (
            <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
            >
              <Tab eventKey="location" title="Location">
                <DesignLocation />
              </Tab>
              <Tab eventKey="load" title="Load">
                <DesignLoad />
              </Tab>
              <Tab eventKey="design" title="Design">
                <DesignDesign />
              </Tab>
              <Tab eventKey="annual" title="Annual Solar">
                <DesignSolarAnnual />
              </Tab>
              <Tab eventKey="daily" title="Daily Solar">
                <DesignSolarDaily />
              </Tab>
              <Tab eventKey="cost" title="Cost">
                <DesignCost />
              </Tab>
            </Tabs>
          )

        }}
      </DesignContextConsumer>
    );
  }


};

export default DesignContent;