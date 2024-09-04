export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  // Add these if you need them
  title?: string;
  body?: string;
}
