import { LazyExoticComponent, FC, lazy } from "react";

export const paths: Paths = {
  bb: [
    {
      name: "Pump me",
      component: lazy(() => import("@participants/bb/01_pump_me")),
    },
    {
      name: "Tomato thrower",
      component: lazy(() => import("@participants/bb/02_tomato_thrower")),
    },
  ],
  bob: [
    {
      name: "01_pump_me",
      component: lazy(() => import("@participants/bob/01_pump_me")),
    },
    {
      name: "02 Tomato Catapult",
      component: lazy(() => import("@participants/bob/02_tomato_catapult")),
    },
    {
      name: "03 Stickers",
      component: lazy(() => import("@participants/bob/03_stickers/Stickers")),
    },
    {
      name: "04 Currling",
      component: lazy(() => import("@participants/bob/04_curling")),
    },
  ],
  elkubok: [],
  gosia: [
    {
      name: "01_pump_me",
      component: lazy(() => import("@participants/gosia/01_pump_me")),
    },
    {
      name: "02_tomato_catapult",
      component: lazy(() => import("@participants/gosia/02_tomato_catapult")),
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
