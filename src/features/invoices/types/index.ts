export interface IInvoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: "draft" | "pending" | "paid";
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IItem[];
  total: number;
}

export interface IAddress {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface IItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export type FilterOptions = {
  draft: boolean;
  pending: boolean;
  paid: boolean;
};
