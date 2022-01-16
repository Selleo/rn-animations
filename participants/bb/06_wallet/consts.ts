import { ImageRequireSource } from "react-native";

export type TransactionDTO = {
  date: string;
  id: string;
  price: string;
  productName: string;
  sellerLogo: string;
  sellerName: string;
};

export type CardDTO = {
  id: number;
  image: ImageRequireSource;
  number: string;
  ownerName: string;
  transactions: TransactionDTO[];
};

const TRANSACTIONS = [
  {
    date: "2020-01-01",
    id: "1",
    price: "100$",
    productName: "Groceries",
    sellerLogo:
      "https://i.pinimg.com/originals/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg",
    sellerName: "Amazon, #223322",
  },
  {
    date: "2020-01-01",
    id: "2",
    price: "30$",
    productName: "Transport",
    sellerLogo: "https://sekurak.pl/wp-content/uploads/2019/11/uber-logo.jpg",
    sellerName: "Uber, #98",
  },
  {
    date: "2020-01-01",
    id: "3",
    price: "140$",
    productName: "Software",
    sellerLogo: "https://tinder.com/static/tinder.png",
    sellerName: "Tinder, #98",
  },
  {
    date: "2020-01-01",
    id: "4",
    price: "140$",
    productName: "PRO Account",
    sellerLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-DuMnu17h7Ibu3j0ewiRHKAQUty-ySkj7kAi-5AyIU1T2-IpESMVpIonQZfdbJ9seNfI&usqp=CAU",
    sellerName: "Dribbble",
  },
  {
    date: "2020-01-01",
    id: "5",
    price: "140$",
    productName: "Software",
    sellerLogo:
      "https://brandingmonitor.pl/wp-content/uploads/2017/10/nowy-symbol-dropbox-lifting.png",
    sellerName: "Dropbox",
  },
];

export const CARDS: CardDTO[] = [
  {
    id: 1,
    number: "0210-3333-6666-0002-7777",
    ownerName: "Bartosz Boruta",
    image: require("./assets/cards/1.png"),
    transactions: TRANSACTIONS,
  },
  {
    id: 2,
    number: "0010-2223-2111-0002-2223",
    image: require("./assets/cards/2.png"),
    ownerName: "Bartosz Boruta",
    transactions: TRANSACTIONS,
  },
  {
    id: 3,
    number: "8910-4423-2113-2002-2223",
    image: require("./assets/cards/3.png"),
    ownerName: "Bartosz Boruta",
    transactions: TRANSACTIONS,
  },
  // {
  //   id: 4,
  //   number: "8910-4423-2113-2002-2223",
  //   image: require("./assets/cards/2.png"),
  //   ownerName: "Bartosz Boruta",
  //   transactions: [
  //     {
  //       id: "3",
  //       productName: "Kalevanrinne ulko ilma katu suunta",
  //       sellerName: "Kalevanrinne ulko ilma katu suunta",
  //       price: "100$",
  //       date: "2020-01-01",
  //     },
  //   ],
  // },
];
