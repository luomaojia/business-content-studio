import { ImagePlus, Tag } from 'lucide-react';
import type { Offer } from '../lib/types';

type OfferFormProps = {
  offer: Offer;
  onChange: (offer: Offer) => void;
};

export function OfferForm({ offer, onChange }: OfferFormProps) {
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
          <p className="eyebrow">Step 2</p>
          <h2 id="offer-heading">产品和活动</h2>
        </div>
        <Tag size={22} aria-hidden="true" />
      </div>

      <label>
        产品/服务名称
        <input
          value={offer.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="例如：小龙虾双人夜宵套餐"
        />
      </label>

      <div className="fieldGrid">
        <label>
          价格
          <input
            value={offer.price}
            onChange={(event) => update('price', event.target.value)}
            placeholder="例如：99"
            inputMode="decimal"
          />
        </label>

        <label>
          活动优惠
          <input
            value={offer.discount}
            onChange={(event) => update('discount', event.target.value)}
            placeholder="例如：送冰粉 2 份"
          />
        </label>
      </div>

      <label>
        卖点
        <textarea
          value={offer.sellingPoints}
          onChange={(event) => update('sellingPoints', event.target.value)}
          placeholder="例如：现炒入味、适合下班聚餐、出餐快"
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
          <img src={offer.imagePreviewUrl} alt="产品预览" />
        ) : (
          <span>
            <ImagePlus size={20} aria-hidden="true" />
            上传产品图
          </span>
        )}
      </label>
    </section>
  );
}
