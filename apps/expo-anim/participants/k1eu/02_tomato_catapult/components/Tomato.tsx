import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated from "react-native-reanimated";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

type Props = {
  style: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
};

function SvgComponent({ style }: Props) {
  return (
    <AnimatedSvg style={style} viewBox="0 0 51.679 51.679">
      <Path
        d="M40.47 8.458c-2.562-1.642-7.374-3.93-11.997-1.816a.67.67 0 01-.952-.607V1.786C27.522.804 26.855 0 26.04 0h-2.223c-.815 0-1.482.804-1.482 1.786v4.501a.67.67 0 01-.802.661c-1.877-.387-6.751-.989-11.412 1.795-.638.381-.268 1.381.464 1.247 2.17-.397 5.026-.67 6.956.092a.674.674 0 01.124 1.189c-1.371.895-3.9 2.953-5.557 6.737-.282.644.51 1.221 1.053.774 2.117-1.744 5.6-4.107 8.554-3.726a.68.68 0 01.607.68c-.03 1.982-.005 8.716 1.632 11.265a.675.675 0 001.117.035c1.043-1.433 3.304-5.233 3.211-11.167a.677.677 0 01.697-.694c1.49.048 5.008.469 7.798 3.194.457.447 1.214.061 1.134-.573-.219-1.735-1.174-4.359-4.631-6.394-.525-.309-.436-1.095.155-1.24 1.194-.293 3.252-.572 6.644-.46.689.021.97-.873.391-1.244z"
        fill="#88c057"
      />
      <Path
        d="M41.248 9.99a.698.698 0 00-.314-.12c-.4-.049-.801-.095-1.201-.149-.143-.014-.287-.025-.429-.039-2.914-.048-4.743.206-5.846.474a.674.674 0 00-.175 1.244c3.457 2.035 4.411 4.659 4.63 6.393.08.634-.677 1.02-1.134.573-2.79-2.724-6.308-3.145-7.798-3.194a.676.676 0 00-.697.694c.092 5.934-2.168 9.734-3.211 11.167a.675.675 0 01-1.117-.035c-1.637-2.549-1.662-9.283-1.632-11.265a.681.681 0 00-.607-.68c-2.954-.382-6.437 1.982-8.554 3.726-.543.447-1.335-.13-1.053-.774 1.655-3.779 4.18-5.836 5.552-6.733a.674.674 0 00-.128-1.19 6.461 6.461 0 00-1.203-.324.735.735 0 00-.234-.004 57.35 57.35 0 00-7.119 1.411.718.718 0 00-.278.144C3.597 15.555.393 21.668.393 28.465c0 12.821 11.393 23.214 25.446 23.214s25.446-10.393 25.446-23.214c.001-7.537-3.937-14.235-10.037-18.475z"
        fill="#d13834"
      />
      <Path
        d="M5.791 34.636a.998.998 0 01-.861-.49A11.328 11.328 0 013.473 30a1 1 0 01.844-1.135.991.991 0 011.135.844 9.457 9.457 0 001.199 3.418 1 1 0 01-.86 1.509zM4.588 26.678a1 1 0 01-.999-1.069c.094-1.327.366-2.616.811-3.834a1.001 1.001 0 011.879.687 11.997 11.997 0 00-.694 3.285 1 1 0 01-.997.931z"
        fill="#ed7161"
      />
    </AnimatedSvg>
  );
}

export default SvgComponent;
