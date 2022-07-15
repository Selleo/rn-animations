import { ColorValue } from "react-native";

export enum WALLET_VIEW {
  default,
  all,
  details,
}

export type Transaction = {
  id: string;
  name: string;
  currency: string;
  avatar: string;
  amount: number;
  date: string;
};

export type Card = {
  color: ColorValue;
  id: number;
  transactions: Transaction[];
};
