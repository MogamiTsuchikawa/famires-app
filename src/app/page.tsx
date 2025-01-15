"use client"

import { ItemDetailModal } from "@/components/ItemDetailModal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { items } from "@/data/item";
import { Item } from "@/types/item";
import { useState } from "react";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden transition-all duration-200 hover:bg-gray-100 cursor-pointer hover:shadow-lg" onClick={() => setSelectedItem(item)}>
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
        ))}
      </div>
      <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
