import { LazyExoticComponent, FC, lazy } from "react";

export const paths: Paths = {
  bb: [
    {
      name: "Pump me",
      component: lazy(() => import("@participants/BB/01_pump_me")),
    },
    {
      name: "Tomato thrower",
      component: lazy(() => import("@participants/BB/02_tomato_thrower")),
    },
  ],
  bob: [
    {
      name: "01_pump_me",
      component: lazy(() => import("@participants/Bob/01_pump_me")),
    },
  ],
  elkubok: [],
  gosia: [
    {
      name: "01_pump_me",
      component: lazy(() => import("@participants/Gosia/01_pump_me")),
    },
    {
      name: "02_tomato_catapult",
      component: lazy(() => import("@participants/Gosia/02_tomato_catapult")),
    },
  ],
  k1eu: [
    {
      name: "01_pump_me",
      component: lazy(() => import("@participants/k1eu/01_pump_me")),
    },
    {
      name: "02_tomato_catapult",
      component: lazy(() => import("@participants/k1eu/02_tomato_catapult")),
    },
  ],
  matro: [],
};

type Paths = {
  [key: string]: Project[];
};

export type Project = {
  name: string;
  component: LazyExoticComponent<FC>;
};
