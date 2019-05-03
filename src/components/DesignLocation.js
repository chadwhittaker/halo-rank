import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';

class DesignLocation extends React.Component {

  renderNotes(notes) {
    if (!notes || notes === "") return <p className="text-muted font-italic font-small">No notes provided</p>
    return <p className="print-notes">{notes}</p>
  }

  renderImages(images) {
    if (!images || images.length === 0) return <p className="text-muted font-italic font-small">No images provided</p>
    return (
      images.map((image) => {
        return (
          <img key={image} width="300" src={image} className="m-1" alt={image} />
        )
      })
    )
  }

  render() {
    return (
      <DesignContextConsumer>
        {(value) => {
          const design = value.designData;
          return (
            <div>
              <p className="content-h5">Location Info</p>
              <div className="d-flex">
                <p className="content-p left-column">Deanery:</p>
                <p className="content-p right-column">{design.inputs.deanery}</p>
              </div>
              <div className="d-flex">
                <p className="content-p left-column">Location:</p>
                <p className="content-p right-column">{design.inputs.location}</p>
              </div>
              <div className="d-flex">
                <p className="content-p left-column">Parish:</p>
                <p className="content-p right-column">{design.inputs.parish}</p>
              </div>
              <div className="d-flex">
                <p className="content-p left-column">Coordinates:</p>
                <p className="content-p right-column">{design.inputs.longitude} &deg; {design.inputs.longitudeDir}, {design.inputs.latitude} &deg; {design.inputs.latitudeDir}</p>
              </div>
              <div className="d-flex">
                <p className="content-p left-column">Deanery:</p>
                <p className="content-p right-column">{design.inputs.deanery}</p>
              </div>
              <p className="content-h5">Area Available for Solar Panels</p>
              <div className="d-flex">
                <p className="content-p left-column">Roof:</p>
                <p className="content-p right-column">{design.inputs.area_roof} m<sup>2</sup></p>
              </div>
              <div className="d-flex">
                <p className="content-p left-column">Ground:</p>
                <p className="content-p right-column">{design.inputs.area_ground} m<sup>2</sup></p>
              </div>
              <p className="content-h5">Notes</p>
                {this.renderNotes(design.inputs.notes)}
              <p className="content-h5">Images</p>
              <div className="d-flex align-items-start flex-wrap my-4">
                {this.renderImages(design.inputs.images)}
              </div>
            </div>
          )
        }}
      </DesignContextConsumer>
    );
  }

};

export default DesignLocation;