import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { DesignContextConsumer } from '../utils/DesignContext';
import DesignContent from './DesignContent';
import ErrorMessage from './ErrorMessage';

const DesignShow = (props) => {
  return (
    <Query query={DESIGN_QUERY} variables={{ id: props.id }} fetchPolicy="no-cache">
      {({ data, loading, error }) => {
        console.log("re-running query")
        if (loading) return <div>Loading...</div>
        if (data.design) return (
          <DesignContextConsumer>
            {(value) => (<DesignContent value={value} queryData={data.design} />)}
          </DesignContextConsumer>
        )
        return <ErrorMessage error={error} />
      }}
    </Query>
  );
}

const DESIGN_QUERY = gql`
  query SHOW_DESIGN ($id: ID!) {
    design(id: $id) {
      id
      createdAt
      updatedAt
      modified
      author {
        id
        username
      }
      deanery
      location
      parish
      longitude
      longitudeDir
      latitude
      latitudeDir
      gridTied
      generator
      voltage
      freq
      phase
      area_roof
      area_ground
      batteryBackup
      autoHours
      loads {
        id
        name
        quantity
        power
        dayUsage
        nightUsage
        usageDays
        surgeMult
        crit
      }
      param_crit
      param_condEff
      param_maxDoD
      param_maxPowerMarkdown
      param_solarEff
      param_surgeMarkup
    }
}
`

export default DesignShow;