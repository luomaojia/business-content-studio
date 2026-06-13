import { ImagePlus, Tag } from 'lucide-react';
import type { Translations } from '../lib/i18n';
import type { Offer } from '../lib/types';

type OfferFormProps = {
  offer: Offer;
  t: Translations;
  onChange: (offer: Offer) => void;
};

export function OfferForm({ offer, t, onChange }: OfferFormProps) {
  function update<K extends keyof Offer>(key: K, value: Offer[K]) {
    onChange({ ...offer, [key]: value });
  }

  function handleImageUpload(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update('imagePreviewUrl', String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <section className="panel" aria-labelledby="offer-heading">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">{t.offer.step}</p>
          <h2 id="offer-heading">{t.offer.title}</h2>
        </div>
        <Tag size={22} aria-hidden="true" />
      </div>

      <label>
        {t.offer.name}
        <input
          value={offer.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder={t.offer.namePlaceholder}
        />
      </label>

      <div className="fieldGrid">
        <label>
          {t.offer.price}
          <input
            value={offer.price}
            onChange={(event) => update('price', event.target.value)}
            placeholder={t.offer.pricePlaceholder}
            inputMode="decimal"
          />
        </label>

        <label>
          {t.offer.discount}
          <input
            value={offer.discount}
            onChange={(event) => update('discount', event.target.value)}
            placeholder={t.offer.discountPlaceholder}
          />
        </label>
      </div>

      <label>
        {t.offer.sellingPoints}
        <textarea
          value={offer.sellingPoints}
          onChange={(event) => update('sellingPoints', event.target.value)}
          placeholder={t.offer.sellingPlaceholder}
          rows={3}
        />
      </label>

      <label className="uploadBox">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => handleImageUpload(event.target.files?.[0])}
        />
        {offer.imagePreviewUrl ? (
          <img src={offer.imagePreviewUrl} alt={t.offer.previewAlt} />
        ) : (
          <span>
            <ImagePlus size={20} aria-hidden="true" />
            {t.offer.upload}
          </span>
        )}
      </label>
    </section>
  );
}
