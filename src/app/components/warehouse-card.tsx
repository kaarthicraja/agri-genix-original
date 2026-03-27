import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";
import { MapPin, Package, IndianRupee } from "lucide-react";

interface WarehouseCardProps {
  name: string;
  location: string;
  capacity: string;
  available: string;
  pricePerKg: string;
  image: string;
  onBook?: () => void;
}

  name,
  location,
  capacity,
  available,
  pricePerKg,
  image,
  onBook,
}: WarehouseCardProps) {
  const { lang } = useLanguage();
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground mb-2">{name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Package className="w-3 h-3" />
              {t('totalCapacity', lang)}
            </div>
            <p className="font-semibold text-card-foreground">{capacity}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('available', lang)}</p>
            <p className="font-semibold text-accent">{available}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="text-lg font-semibold text-primary">{pricePerKg}</span>
            <span className="text-sm text-muted-foreground">{t('perKgMonth', lang)}</span>
          </div>
        </div>
        {onBook && (
          <button
            onClick={onBook}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {t('bookStorage', lang)}
          </button>
        )}
      </div>
    </div>
  );
}
