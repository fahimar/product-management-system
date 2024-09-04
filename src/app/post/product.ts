export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  // Optional properties
  title?: string;
  body?: string;
}
