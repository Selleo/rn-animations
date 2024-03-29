export const People: People = {
  bb: {
    displayName: "bb",
    img: require("@assets/participants/bb.png"),
  },
  bob: {
    displayName: "bob",
    img: require("@assets/participants/bob.png"),
  },
  elkubok: {
    displayName: "elkubok",
    img: require("@assets/participants/elkubok.png"),
  },
  gosia: {
    displayName: "gosia",
    img: require("@assets/participants/gosia.png"),
  },
  k1eu: {
    displayName: "k1eu",
    img: require("@assets/participants/k1eu.png"),
  },
  matro: {
    displayName: "matro",
    img: require("@assets/participants/matro.png"),
  },
  monika: {
    displayName: "monika",
    img: require("@assets/participants/monika.png"),
  },
  damcyk: {
    displayName: "damcyk",
    img: require("@assets/participants/damcyk.png"),
  },
  michal: {
    displayName: "michal",
    img: require("@assets/participants/michal.png"),
  },
};

type People = {
  [key: string]: {
    displayName: string;
    img: number;
  };
};
