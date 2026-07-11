import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, total, clearCart } = useCart();

  const handleWhatsApp = () => {
    const lines = items.map(
      (i) => `• ${i.quantity}x ${i.name} (${(i.price * i.quantity).toFixed(2)}€)`
    );
    const msg = [
      "🍕 *Nouvelle commande – La Bella Pizza*",
      "",
      ...lines,
      "",
      `*Total : ${total.toFixed(2)}€*`,
      "",
      "_(Livraison ou à emporter ?)_",
    ].join("\n");
    window.open(`https://wa.me/33123456789?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0d0300] z-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="font-playfair text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-400" />
            Mon Panier
            {items.length > 0 && (
              <span className="text-sm bg-red-600 text-white px-2 py-0.5 rounded-full ml-1">
                {items.length}
              </span>
            )}
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-7xl animate-float">🍕</span>
              <p className="text-white/60 font-medium">Votre panier est vide</p>
              <p className="text-white/40 text-sm">Ajoutez vos pizzas préférées !</p>
              <button
                onClick={toggleCart}
                className="mt-2 px-6 py-2.5 bg-fire rounded-full text-white font-semibold text-sm hover:opacity-90 transition-all glow-fire-sm"
              >
                Voir le menu
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="cart-item-enter flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10 hover:border-orange-500/30 transition-colors"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">{item.name}</p>
                  {item.size && (
                    <p className="text-white/40 text-xs">{item.size}</p>
                  )}
                  <p className="text-orange-400 font-bold text-sm mt-0.5">
                    {(item.price * item.quantity).toFixed(2)}€
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-600/60 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3 h-3 text-white" />
                  </button>
                  <span className="text-white font-bold text-sm w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-green-600/60 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3 text-white" />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 p-5 space-y-4">
            {/* Totaux */}
            <div className="space-y-2">
              <div className="flex justify-between text-white/60 text-sm">
                <span>Sous-total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-white/60 text-sm">
                <span>Livraison</span>
                <span className={total >= 25 ? "text-green-400" : "text-orange-400"}>
                  {total >= 25 ? "GRATUITE 🎉" : `${(25 - total).toFixed(2)}€ restant`}
                </span>
              </div>
              {total < 25 && (
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div
                    className="bg-fire h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((total / 25) * 100, 100)}%` }}
                  />
                </div>
              )}
              <div className="flex justify-between text-white font-bold text-lg pt-1 border-t border-white/10">
                <span>Total</span>
                <span className="text-orange-400">{(total + (total >= 25 ? 0 : 2.5)).toFixed(2)}€</span>
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe59] text-white font-bold py-3.5 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-green-900/30"
            >
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Commander via WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full text-white/40 hover:text-white/70 text-sm transition-colors py-1"
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </>
  );
}
