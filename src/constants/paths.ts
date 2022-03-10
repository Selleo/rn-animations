import { FC, LazyExoticComponent, lazy } from "react";

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
    {
      name: "Stickers",
      component: lazy(() => import("@participants/bb/03_stickers")),
    },
    {
      name: "Curling",
      component: lazy(() => import("@participants/bb/04_curling")),
    },
    {
      name: "Shared Elements",
      component: lazy(() => import("@participants/bb/05_shared_transition")),
    },
    {
      name: "Wallet",
      component: lazy(() => import("@participants/bb/06_wallet")),
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
    {
      name: "05 Homes",
      component: lazy(() => import("@participants/bob/05_homes")),
    },
    {
      name: "06 Cards",
      component: lazy(() => import("@participants/bob/06_cards")),
    },
    {
      name: "07 Radial Drawer",
      component: lazy(() => import("@participants/bob/07_radial_drawer")),
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
    {
      name: "06_wallet",
      component: lazy(() => import("@participants/gosia/06_wallet")),
    },
  ],
  k1eu: [
    {
      name: "Pump my button",
      component: lazy(() => import("@participants/k1eu/01_pump_me")),
    },
    {
      name: "Tomato Catapult",
      component: lazy(() => import("@participants/k1eu/02_tomato_catapult")),
    },
    {
      name: "Sticky Notes",
      component: lazy(() => import("@participants/k1eu/03_sticky_notes")),
    },
    {
      name: "Curling",
      component: lazy(() => import("@participants/k1eu/04_curling")),
    },
    {
      name: "Apartments Swipee",
      component: lazy(() => import("@participants/k1eu/05_apartments")),
    },
  ],
  matro: [],
  monika: [
    {
      name: "Wallet",
      component: lazy(() => import("@participants/monika/06_wallet")),
    },
  ],
};

type Paths = {
  [key: string]: Project[];
};

export type Project = {
  name: string;
  component: LazyExoticComponent<FC>;
};
