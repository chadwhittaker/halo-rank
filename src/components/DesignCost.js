import React from 'react';
import { DesignContextConsumer } from '../utils/DesignContext';
import { formatMoney } from '../utils';

class DesignCost extends React.Component {

  addMulticluster = (inverter) => {
    if (inverter.multicluster) {
      return (
        <tr>
          <td>Multicluster Unit</td>
          <td className="text-left">{inverter.mc_name}</td>
          <td className="text-right">{inverter.mc_qty}</td>
          <td className="text-right">{formatMoney(inverter.mc_cost)}</td>
          <td className="text-right pr-2">{formatMoney(inverter.mc_qty * inverter.mc_cost)}</td>
        </tr>
      )
    }

    return null;
  }

  render() {
    return (
      <DesignContextConsumer>
        {(value) => {
          const design = value.designData;
          return (
            <div>
              <p className="content-h5">Estimated Cost of Devices</p>
              <table className="table table-sm max-700">
                <thead>
                  <tr>
                    <th scope="col">Device</th>
                    <th scope="col" className="text-left">Name</th>
                    <th scope="col" className="text-right">Qty</th>
                    <th scope="col" className="text-right">Cost (ea)</th>
                    <th scope="col" className="text-right pr-2">Cost (total)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Solar Panels</td>
                    <td className="text-left">{design.panel.name}</td>
                    <td className="text-right">{design.numPanelsSelected}</td>
                    <td className="text-right">{formatMoney(design.panel.cost)}</td>
                    <td className="text-right pr-2">{formatMoney(design.panel.cost * design.numPanelsSelected)}</td>
                  </tr>
                  <tr>
                    <td>Inverter(s)</td>
                    <td className="text-left">{design.inverter.pn}</td>
                    <td className="text-right">{design.inverter.qty}</td>
                    <td className="text-right">{formatMoney(design.inverter.cost)}</td>
                    <td className="text-right pr-2">{formatMoney(design.inverter.cost * design.inverter.qty)}</td>
                  </tr>
                  {this.addMulticluster(design.inverter)}
                  <tr>
                    <td>Charger(s)</td>
                    <td className="text-left">{design.charger.pn}</td>
                    <td className="text-right">{design.charger.qty}</td>
                    <td className="text-right">{formatMoney(design.charger.cost)}</td>
                    <td className="text-right pr-2">{formatMoney(design.charger.cost * design.charger.qty)}</td>
                  </tr>
                  <tr>
                    <td>Battery</td>
                    <td className="text-left">{design.battery.pn}</td>
                    <td className="text-right">{design.battery.qty}</td>
                    <td className="text-right">{formatMoney(design.battery.cost)}</td>
                    <td className="text-right pr-2">{formatMoney(design.battery.cost * design.battery.qty)}</td>
                  </tr>
                  <tr>
                    <td>Misc (10%)</td>
                    <td className="text-left"></td>
                    <td className="text-right">1</td>
                    <td className="text-right">{formatMoney(0.1 * (design.panel.cost * design.numPanelsSelected + design.inverter.cost * design.inverter.qty + design.charger.cost * design.charger.qty + design.battery.cost * design.battery.qty + design.inverter.mc_qty * design.inverter.mc_cost))}</td>
                    <td className="text-right pr-2">{formatMoney(0.1 * (design.panel.cost * design.numPanelsSelected + design.inverter.cost * design.inverter.qty + design.charger.cost * design.charger.qty + design.battery.cost * design.battery.qty + design.inverter.mc_qty * design.inverter.mc_cost))}</td>
                  </tr>
                  <tr id="last-row-cost">
                    <td>Total</td>
                    <td className="text-left"></td>
                    <td className="text-right"></td>
                    <td className="text-right"></td>
                    <td className="text-right pr-2">{formatMoney(1.1 * (design.panel.cost * design.numPanelsSelected + design.inverter.cost * design.inverter.qty + design.charger.cost * design.charger.qty + design.battery.cost * design.battery.qty + design.inverter.mc_qty * design.inverter.mc_cost))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        }}
      </DesignContextConsumer>
    );
  }

};

export default DesignCost;