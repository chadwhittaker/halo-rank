import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';
import { Link } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
// import TabContainer from 'react-bootstrap/TabContainer';
// import TabContent from 'react-bootstrap/TabContent';
// import TabPane from 'react-bootstrap/TabPane';
// import { withStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

import DesignLocation from './DesignLocation';
import DesignLoad from './DesignLoad';
import DesignDesign from './DesignDesign';
import DesignSolar from './DesignSolar';
import DesignCost from './DesignCost';

class DesignContent extends React.Component {
  state = { key: 'load' }

  componentDidMount() {
    // generate all design data based on query results
    console.log("query",this.props.queryData)
    this.props.value.generateDesignData(this.props.queryData);
  }

  render() {
    return (
      <DesignContextConsumer>
        {(value) => {
          // contains latest design data to print to screen
          console.log(value)
          if (!value.designData) return <div>Loading...</div>
          const data = value.designData;

          return (
            <div>
              <div className="my-4">
                <h2>{data.inputs.deanery}, Ghana</h2>
                <h5>{data.inputs.location} - {data.inputs.parish}</h5>
                <Link className="btn btn-sm btn-danger" to={`/ghana/designs/edit/${this.props.queryData.id}`}>Edit Design</Link>
                <button type="button" className="btn btn-sm btn-primary ml-2">Save Changes</button>
              </div>
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="load" title="Load">
                  <DesignLoad loads={data.inputs.loads}/>
                </Tab>
                <Tab eventKey="design" title="Design">
                  <DesignDesign />
                </Tab>
                <Tab eventKey="annual" title="Solar Data">
                  <DesignSolar />
                </Tab>
                <Tab eventKey="cost" title="Cost">
                  <DesignCost />
                </Tab>
                <Tab eventKey="location" title="Location">
                  <DesignLocation />
                </Tab>
              </Tabs>
            </div>
          )
        }}
      </DesignContextConsumer>
    );
  }
};

export default DesignContent;


// // MATERIAL UI VERSION
// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
// };

// class DesignContent extends React.Component {
//   state = {
//     selectedTab: 0,
//   };

//   componentDidMount() {
//     // generate all design data based on query results
//     this.props.value.generateDesignData(this.props.queryData);
//   }

//   handleChange = (event, value) => {
//     this.setState({ selectedTab: value })
//   }

//   render() {
//     const { classes } = this.props;
//     const selectedTab = this.state.selectedTab;

//     return (
//       <DesignContextConsumer>
//         {(value) => {
//           // contains latest design data to print to screen
//           console.log(value)
//           if (!value.designData) return <div>Loading...</div>

//           return (
//             <div>
//               <Paper className={classes.root}>
//                 <Tabs
//                   value={selectedTab}
//                   onChange={this.handleChange}
//                   indicatorColor="primary"
//                   textColor="primary"
//                   centered
//                 >
//                   <Tab label="Location" />
//                   <Tab label="Load" />
//                   <Tab label="Design" />
//                   <Tab label="Solar" />
//                 </Tabs>
//               </Paper>
//               {selectedTab === 0 && <TabContainer>Item One</TabContainer>}
//               {selectedTab === 1 && <TabContainer>Item Two</TabContainer>}
//               {selectedTab === 2 && <TabContainer>Item Three</TabContainer>}
//               {selectedTab === 3 && <TabContainer>Item Four</TabContainer>}
//             </div>
//           )
//         }}
//       </DesignContextConsumer>
//     )
//   }
// }

// DesignContent.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// // the defined styles now show up on props
// export default withStyles(styles)(DesignContent);


