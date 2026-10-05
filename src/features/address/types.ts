import type { Dispatch, SetStateAction } from "react";

export type Region = { region: string; code: string; flag: string };

export type Address = {
  region: string;
  title: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  flag: string;
  countryCode: string;
};

export type AddressSetter = Dispatch<SetStateAction<Address>>;
