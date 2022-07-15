import * as React from "react";
import Svg, { SvgProps, Circle } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    {...props}
  >
    <Circle
      cx={50}
      cy={50}
      fill="none"
      stroke="#000000"
      strokeWidth={10}
      r={35}
      strokeDasharray="164.93361431346415 56.97787143782138"
    />
  </Svg>
);

export default SvgComponent;
