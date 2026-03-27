import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { MapPin, Phone } from "lucide-react";

interface CropCardProps {
  image: string;
  cropName: string;
  farmerName: string;
  location: string;
  quantity: string;
  price: string;
  onContact?: () => void;
  onBuy?: () => void;
}

export function CropCard({
  image,
  cropName,
  farmerName,
  location,
  quantity,
  price,
  onContact,
  onBuy,
}: CropCardProps) {
  const { lang } = useLanguage();
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={cropName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground mb-2">{cropName}</h3>
        <p className="text-sm text-muted-foreground mb-1">{t('farmer', lang)}: {farmerName}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">{t('quantity', lang)}</p>
            <p className="font-semibold text-card-foreground">{quantity}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{t('price', lang)}</p>
            <p className="font-semibold text-primary">{price}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {onContact && (
            <button
              onClick={onContact}
              className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              {t('contact', lang)}
            </button>
          )}
          {onBuy && (
            <button
              onClick={onBuy}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t('buyNow', lang)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
