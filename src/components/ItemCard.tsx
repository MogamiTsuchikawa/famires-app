import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all duration-200 hover:bg-gray-100 cursor-pointer hover:shadow-lg"
      onClick={() => onClick(item)}
    >
      <div className="w-full h-48">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">¥{item.price.toLocaleString()}</p>
      </CardContent>
    </Card>
  );
}
