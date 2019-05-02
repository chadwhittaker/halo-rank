import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';
import { wtokwUp, wtokwRound, round } from '../utils'

const DesignDesign = () => {
  return (
    <DesignContextConsumer>
      {(value) => {
        const design = value.designData;
        let size = ""
        let image = ""
        if (design.inverter.refDesign === 1) {
          switch (design.inverter.bucket) {
            case 1:
              size = "0-3 kW"
              image = design.critLoad ? "/images/FP1_CRIT.png" : "/images/FP1.png";
              break;
            case 2:
              size = "3-6 kW"
              image = design.critLoad ? "/images/FP2_CRIT.png" : "/images/FP2.png";
              break;
            case 3:
              size = "6-12 kW"
              image = design.critLoad ? "/images/FP4_CRIT.png" : "/images/FP4.png";
              break;
            default:
              size = "NA"
          }
          if (design.inverter.refDesign === 2) {
            switch (design.inverter.bucket) {
              case 1:
                size = "12-18 kW"
                image = design.critLoad ? "/images/SMA-1C_CRIT.png" : "/images/SMA-1C.png";
                break;
              case 2:
                size = "18-36 kW"
                image = design.critLoad ? "/images/SMA-2C_CRIT.png" : "/images/SMA-2C.png";
                break;
              case 3:
                size = "36-54 kW"
                image = design.critLoad ? "/images/SMA-3C_CRIT.png" : "/images/SMA-3C.png";
                break;
              case 4:
                size = ">54 kW"
                image = design.critLoad ? "/images/" : "/images/";
                break;
              default:
                size = "NA"
            }
          }


          return (
            <div className="mb-4">
              <p className="content-h5">Reference Design #{design.inverter.refDesign} - Bucket #{design.inverter.bucket}</p>
              <div className="d-flex">
                <p className="content-p left-column">For Loads:</p>
                <p className="content-p right-column">{size}</p>
              </div>
              <div className="d-flex">
                <p className="content-p left-column">Inverter Supplier:</p>
                <p className="content-p right-column">{design.inverter.manuf}</p>
              </div>
              <p className="content-h5">Block Diagram</p>
              <img src={image} className="img-fluid max-700" alt="block-diagram" />

              <p className="content-h5">Components</p>

              <div className="d-flex flex-wrap">
                <div className="d-flex justify-content-start">
                  <div className="component-card shadow" id="pv-details">
                    <p className="title-h5 text-center">Solar Array</p>
                    <hr />
                    <p className="title-card">Rated Solar Power:</p>
                    <p className="content-card">{wtokwUp(design.ratedSolarP)} kW</p>
                    <p className="title-card">Energy Produced (per day):</p>
                    <p className="content-card">{round(design.solarProducedAvgDay,1)} kWh</p>
                    <p className="title-card">Number of Panels:</p>
                    <p className="content-card">{design.numPanelsSelected} ({design.numStrings} strings of {design.charger.ideal_string_size})</p>
                    <p className="title-card">Panel Description:</p>
                    <p className="content-card">{design.panel.name}</p>
                    <p className="title-card">Areq Required:</p>
                    <p className="content-card">{design.areaRequired.toFixed(0)} m<sup>2</sup></p>
                  </div>
                  <div className="component-card shadow" id="charger-details">
                    <p className="title-h5 text-center">Charger</p>
                    <hr />
                    <p className="title-card">Manufacturer:</p>
                    <p className="content-card">{design.charger.manuf}</p>
                    <p className="title-card">Product Name:</p>
                    <p className="content-card">{design.charger.name}</p>
                    <p className="title-card">Max Power (continuous):</p>
                    <p className="content-card">{wtokwRound(design.charger.pmax, 1)} kW</p>
                    <p className="title-card">Max Strings Allowed:</p>
                    <p className="content-card">{design.charger.max_num_strings} strings of {design.charger.ideal_string_size}</p>
                    <p className="title-card">AC or DC Output:</p>
                    <p className="content-card">{design.charger.ACinverter ? "AC" : "DC"}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-start">
                  <div className="component-card shadow" id="inverter-details">
                    <p className="title-h5 text-center">Inverter</p>
                    <hr />
                    <p className="title-card">Manufacturer:</p>
                    <p className="content-card">{design.inverter.manuf}</p>
                    <p className="title-card">Product Name:</p>
                    <p className="content-card">{design.inverter.name}</p>
                    <p className="title-card">Max Power (continuous):</p>
                    <p className="content-card">{wtokwRound(design.inverter.p_cont, 1)} kW</p>
                    <p className="title-card">Max Power (30 min):</p>
                    <p className="content-card">{wtokwRound(design.inverter.p_30m, 1)} kW</p>
                    <p className="title-card">Max Power (3 sec):</p>
                    <p className="content-card">{wtokwRound(design.inverter.p_surge, 1)} kW</p>
                  </div>
                  <div className="component-card shadow" id="battery-details">
                    <p className="title-h5 text-center">Battery</p>
                    <hr />
                    <p className="title-card">Package:</p>
                    <p className="content-card">{design.battery.name}</p>
                    <p className="title-card">Capacity (rated, 8hrs):</p>
                    <p className="content-card">{round(design.battery.ahr_8hr, 1)} Ah</p>
                    <p className="title-card">Capacity (usable, 8hrs):</p>
                    <p className="content-card">{round(design.battery.ahrUsable, 1)} Ah</p>
                    <p className="title-card">Energy (usable):</p>
                    <p className="content-card">{wtokwRound(design.battery.energyUsable, 1)} kWh</p>
                    <p className="title-card">Hours of Autonomy:</p>
                    <p className="content-card">{round(design.autoHoursActual, 1)} hours</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      }}
    </DesignContextConsumer>
  );
};

export default DesignDesign;