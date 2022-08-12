import { Dimensions } from "react-native";

// DIMENSIONS
export const MARGIN = 20;
export const CARD_WIDTH = Dimensions.get("window").width - 2 * MARGIN;
export const CARD_HEIGHT = Math.floor(CARD_WIDTH * 0.6);
export const CARDS_OVERLAY = 30;

// TIME

// MOCK DATA
export const transactionsList = [
  {
    id: 11,
    picture: "",
    shop: "KFC",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
  {
    id: 12,
    picture: "",
    shop: "McDonald's",
    category: "xyz",
    price: "$48.20",
    date: "18.03.2020",
  },
  {
    id: 13,
    picture: "",
    shop: "KFC",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
  {
    id: 14,
    picture: "",
    shop: "BurgerKing",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
  {
    id: 15,
    picture: "",
    shop: "KFC",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
  {
    id: 16,
    picture: "",
    shop: "BurgerKing",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
  {
    id: 17,
    picture: "",
    shop: "KFC",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
  {
    id: 18,
    picture: "",
    shop: "BurgerKing",
    category: "xyz",
    price: "$8.20",
    date: "18.03.2020",
  },
];
