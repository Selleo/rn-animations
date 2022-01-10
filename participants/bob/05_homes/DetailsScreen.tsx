import { SharedElement } from "react-navigation-shared-element";
import { Image } from "react-native";
import { useState } from "react";

const DetailScreen = (props: any) => {
  const { item } = props.route.params;
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <SharedElement id={`item.${item.id}.photo`}>
      <Image
        style={{ height: 300, widht: "100%" }}
        source={{ uri: item.photoUrls[currentImage] }}
      />
    </SharedElement>
  );
};

export default DetailScreen;
