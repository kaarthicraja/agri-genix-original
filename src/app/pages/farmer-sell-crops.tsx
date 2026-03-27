import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Wheat, Package, IndianRupee, MapPin, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../LanguageContext";
import { t } from "../i18n";

import { getCropImage } from "../data/cropImages";

export default function FarmerSellCropsPage() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ crop: "", quantity: "", price: "", location: "" });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save crop to localStorage
    const crops = JSON.parse(localStorage.getItem("listedCrops") || "[]");
    crops.push({
      cropName: form.crop,
      quantity: form.quantity + " kg",
      price: `₹${form.price}/kg`,
      location: form.location,
      farmerName: "Farmer",
      image: getCropImage(form.crop)
    });
    localStorage.setItem("listedCrops", JSON.stringify(crops));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
    setForm({ crop: "", quantity: "", price: "", location: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-border shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">{t('sellCrops', lang)}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="relative group">
              <Label htmlFor="crop" className="text-foreground">{t('cropType', lang)}</Label>
              <Input
                id="crop"
                className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                value={form.crop}
                onChange={e => setForm({ ...form, crop: e.target.value })}
                placeholder="e.g. Wheat"
                autoComplete="off"
                required
              />
              <Wheat className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
            </div>
            <div className="relative group">
              <Label htmlFor="quantity" className="text-foreground">{t('quantityKg', lang)}</Label>
              <Input
                id="quantity"
                type="number"
                className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                placeholder="e.g. 100"
                min={1}
                required
              />
              <Package className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
            </div>
            <div className="relative group">
              <Label htmlFor="price" className="text-foreground">{t('pricePerKg', lang)}</Label>
              <Input
                id="price"
                type="number"
                className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="e.g. 20"
                min={1}
                required
              />
              <IndianRupee className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
            </div>
            <div className="relative group">
              <Label htmlFor="location" className="text-foreground">{t('location', lang)}</Label>
              <Input
                id="location"
                className="pl-10 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Amritsar"
                required
              />
              <MapPin className="absolute left-3 top-9 text-primary/70 group-focus-within:text-primary transition-colors" size={20} />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-2 py-3 text-lg font-bold bg-primary text-primary-foreground rounded-xl transition-all duration-200 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {t('listCropForSale', lang)}
          </Button>
          {success && (
            <div className="flex flex-col items-center justify-center mt-4">
              <CheckCircle2 className="text-primary animate-bounce-in" size={40} />
              <span className="text-primary font-semibold mt-2">{t('cropListedSuccess', lang)}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
