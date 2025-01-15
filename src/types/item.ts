export type Item = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export type ItemCart = {
    item: Item;
    count: number;
}