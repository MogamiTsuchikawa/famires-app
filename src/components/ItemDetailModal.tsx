import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Item } from "@/types/item";
import { useCartStore } from "@/store/cart";

interface ItemDetailModalProps {
  item: Item | null;
  onClose: () => void;
}

export function ItemDetailModal({ item, onClose }: ItemDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  if (!item) return null;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addItem(item, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={!!item} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-square">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">{item.description}</p>
            <p className="text-2xl font-bold">¥{item.price.toLocaleString()}</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">数量</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-medium">{quantity}</div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={handleAddToCart}>
              カートに追加
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 