import React from 'react';
import GaugeChart from "react-gauge-chart";
import './Radialbar_Charts_Gradient'; // Make sure the path is correct

const Radialbar_Charts_Gradient = ({ staticValue, maxValue, label }) => {
  const percent = staticValue / maxValue; // Convert static value to a percent

  return (
    <div className="container"> {/* Use the class from your CSS file */}
      <div className="label">{label}</div> {/* Use the class from your CSS file */}
      <GaugeChart
        id="gauge-chart3"
        nrOfLevels={30}
        colors={["#5633b2", "#7949FF"]}
        arcWidth={0.3}
        percent={percent}
        animate={true}
        animateDuration={10000}
        marginInPercent={0.04}
        needleColor="#FFFFFF"
        needleBaseColor="#7949FF"
        hideText={true}
      />
      <div className="valueDisplay">{`${staticValue} / ${maxValue} Units`}</div> {/* Use the class from your CSS file */}
    </div>
  );
};

export default Radialbar_Charts_Gradient;
