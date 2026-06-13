import { Building2, Sparkles } from 'lucide-react';
import type { BusinessProfile, Industry, Tone } from '../lib/types';
import { industryPresets } from '../lib/presets';

type BusinessFormProps = {
  profile: BusinessProfile;
  onChange: (profile: BusinessProfile) => void;
  onUsePreset: (industry: Industry) => void;
};

const industries = Object.keys(industryPresets) as Industry[];
const tones: Tone[] = ['接地气', '高级感', '活泼', '专业可信'];

export function BusinessForm({ profile, onChange, onUsePreset }: BusinessFormProps) {
  function update<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <section className="panel" aria-labelledby="business-heading">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">Step 1</p>
          <h2 id="business-heading">店铺资料</h2>
        </div>
        <Building2 size={22} aria-hidden="true" />
      </div>

      <label>
        店铺名称
        <input
          value={profile.name}
          onChange={(event) => update('name', event.target.value)}
          placeholder="例如：巷口夜宵铺"
        />
      </label>

      <div className="fieldGrid">
        <label>
          行业
          <select
            value={profile.industry}
            onChange={(event) => {
              const nextIndustry = event.target.value as Industry;
              update('industry', nextIndustry);
            }}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>

        <label>
          城市/商圈
          <input
            value={profile.city}
            onChange={(event) => update('city', event.target.value)}
            placeholder="例如：杭州湖滨"
          />
        </label>
      </div>

      <div className="fieldGrid">
        <label>
          客单价
          <input
            value={profile.avgPrice}
            onChange={(event) => update('avgPrice', event.target.value)}
            placeholder="例如：68"
            inputMode="decimal"
          />
        </label>

        <label>
          品牌语气
          <select value={profile.tone} onChange={(event) => update('tone', event.target.value as Tone)}>
            {tones.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        主打产品
        <textarea
          value={profile.signatureItems}
          onChange={(event) => update('signatureItems', event.target.value)}
          placeholder="例如：小龙虾、炭烤牛油、冰粉"
          rows={3}
        />
      </label>

      <div className="presetRow" aria-label="行业样例">
        {industries.map((industry) => (
          <button
            key={industry}
            className="ghostButton"
            type="button"
            onClick={() => onUsePreset(industry)}
            title={`套用${industry}样例`}
          >
            <Sparkles size={16} aria-hidden="true" />
            {industry.replace('/夜宵店', '')}
          </button>
        ))}
      </div>
    </section>
  );
}
