import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import history from '../history';
import DataTable from "mui-datatables";


class DesignListGhana extends Component {
  render() {
    return (
      <Query query={ALL_DESIGNS_QUERY}>
        {({ data, loading }) => {
          if (loading) return <div>Loading...</div>
          if (data.designs) {

            return (
              <div className="my-4">
                <DataTable
                  title={"Ghana Designs"}
                  data={data.designs}
                  columns={columns}
                  options={options}
                />
              </div>
            )
          }
        }}
      </Query>
    );
  }
}

// table definition
const options = {
  filterType: 'checkbox',
  selectableRows: false,
  pagination: false,
  onRowClick: (rowData => history.push(`/ghana/designs/${rowData[7]}`))
}

const columns = [
  {
   name: "deanery",
   label: "Deanery",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "location",
   label: "Location",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "parish",
   label: "Parish",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "dailyLoad",
   label: "Load (kWh)",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "output_pv",
   label: "PV (kW)",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "inverter",
   label: "Design",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "cost",
   label: "Cost Est ($)",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "id",
   label: "id",
   options: {
    filter: false,
    sort: false,
    display: 'excluded',
   }
  },
 ];

// QUERY DEFINITION
const ALL_DESIGNS_QUERY = gql`
  query SHOW_ALL_DESIGNS {
    designs {
      id
      deanery
      location
      parish
      dailyLoad
      output_pv
      inverter
      battery
      charger
      refDesign
      bucket
      cost
    }
  }
`

export default DesignListGhana;
