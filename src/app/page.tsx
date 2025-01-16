"use client";

import { ChatInterface } from "@/components/ChatInterface";
import { ItemCard } from "@/components/ItemCard";
import { ItemDetailModal } from "@/components/ItemDetailModal";
import { items } from "@/data/item";
import { Item } from "@/types/item";
import { useState } from "react";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onClick={setSelectedItem} />
        ))}
      </div>
      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
      <div className="fixed bottom-4 left-4 z-50">
        <ChatInterface setSelectedItem={setSelectedItem} />
      </div>
    </div>
  );
}
