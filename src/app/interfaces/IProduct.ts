export interface IProduct {
    _id: string;
    title: string;
    miniDescription: string;
    description: string;
    price: number;
    sale: number;
    photo: string;
    gallery: string[];
    category: string;
}
