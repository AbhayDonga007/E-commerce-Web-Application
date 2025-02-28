export interface Product {
    _id: string;
    name: string;
    des: string;
    type: Array<string>;
    size: Array<string>;
    customerPrize: number;
    productPrize: number;
    retailPrize: number;
    artical_no: string;
    color: Array<string>;
    images: Array<string>;
  }
  
  export interface CartProduct {
    productId: Product;
    productQnt: number;
    productSize: string;
    productColor: string;
  }
  export interface Cart {
    userId: string;
    products: CartProduct[];
  }