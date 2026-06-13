import { Building2, Sparkles } from 'lucide-react';
import type { BusinessProfile, Industry, Tone } from '../lib/types';
import { industryPresets } from '../lib/presets';
import type { Translations } from '../lib/i18n';

type BusinessFormProps = {
  profile: BusinessProfile;
  t: Translations;
  onChange: (profile: BusinessProfile) => void;
  onUsePreset: (industry: Industry) => void;
};

const industries = Object.keys(industryPresets) as Industry[];
const tones: Tone[] = ['接地气', '高级感', '活泼', '专业可信'];

export function BusinessForm({ profile, t, onChange, onUsePreset }: BusinessFormProps) {
  function update<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <section className="panel" aria-labelledby="business-heading">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">{t.business.step}</p>
          <h2 id="business-heading">{t.business.title}</h2>
        </div>
        <Building2 size={22} aria-hidden="true" />
      </div>

      <label>
        {t.business.name}
        <input
          value={profile.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder={t.business.namePlaceholder}
        />
      </label>

      <div className="fieldGrid">
        <label>
          {t.business.industry}
          <select
            value={profile.industry}
            onChange={(event) => {
              const nextIndustry = event.target.value as Industry;
              update('industry', nextIndustry);
            }}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {t.industries[industry]}
              </option>
            ))}
          </select>
        </label>

        <label>
          {t.business.city}
          <input
            value={profile.city}
            onChange={(event) => update('city', event.target.value)}
            placeholder={t.business.cityPlaceholder}
          />
        </label>
      </div>

      <div className="fieldGrid">
        <label>
          {t.business.avgPrice}
          <input
            value={profile.avgPrice}
            onChange={(event) => update('avgPrice', event.target.value)}
            placeholder={t.business.avgPricePlaceholder}
            inputMode="decimal"
          />
        </label>

        <label>
          {t.business.tone}
          <select value={profile.tone} onChange={(event) => update('tone', event.target.value as Tone)}>
            {tones.map((tone) => (
              <option key={tone} value={tone}>
                {t.tones[tone]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        {t.business.signatureItems}
        <textarea
          value={profile.signatureItems}
          onChange={(event) => update('signatureItems', event.target.value)}
          placeholder={t.business.signaturePlaceholder}
          rows={3}
        />
      </label>

      <div className="presetRow" aria-label={t.business.presets}>
        {industries.map((industry) => (
          <button
            key={industry}
            className="ghostButton"
            type="button"
            onClick={() => onUsePreset(industry)}
            title={t.business.presetTitle(t.industries[industry])}
          >
            <Sparkles size={16} aria-hidden="true" />
            {t.industries[industry]}
          </button>
        ))}
      </div>
    </section>
  );
}
