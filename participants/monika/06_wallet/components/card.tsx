import * as React from "react";
import Svg, { SvgProps, G, Path, Polygon } from "react-native-svg";

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      // xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      {...props}
    >
      <G>
        <Path
          fill="#6abda0"
          d="M476.69,441.379H35.31c-19.5,0-35.31-15.81-35.31-35.31V105.931c0-19.5,15.81-35.31,35.31-35.31
		H476.69c19.5,0,35.31,15.81,35.31,35.31v300.138C512,425.569,496.19,441.379,476.69,441.379"
        />
        <Polygon
          fill="#488578"
          points="0,194.207 512,194.207 512,123.586 0,123.586 	"
        />
        <Polygon
          fill="#f0c419"
          points="300.138,388.414 459.034,388.414 459.034,300.138 300.138,300.138 	"
        />
        <G>
          <Path
            fill="#488578"
            d="M123.483,264.828H44.141c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h79.342
			c4.882,0,8.828,3.946,8.828,8.828S128.365,264.828,123.483,264.828"
          />
          <Path
            fill="#488578"
            d="M238.345,264.828h-79.342c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h79.342
			c4.882,0,8.828,3.946,8.828,8.828S243.226,264.828,238.345,264.828"
          />
          <Path
            fill="#488578"
            d="M176.552,300.138H44.138c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h132.414
			c4.882,0,8.828,3.946,8.828,8.828S181.433,300.138,176.552,300.138"
          />
          <Path
            fill="#488578"
            d="M238.345,300.138h-26.483c-4.882,0-8.828-3.946-8.828-8.828s3.946-8.828,8.828-8.828h26.483
			c4.882,0,8.828,3.946,8.828,8.828S243.226,300.138,238.345,300.138"
          />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
