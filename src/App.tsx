import { useEffect, useMemo, useState } from 'react';
import { Check, Store, WandSparkles } from 'lucide-react';
import { AppInstallPrompt } from './components/AppInstallPrompt';
import { BusinessForm } from './components/BusinessForm';
import { ContentCalendar } from './components/ContentCalendar';
import { ExportPanel } from './components/ExportPanel';
import { OfferForm } from './components/OfferForm';
import { ReviewReplyPanel } from './components/ReviewReplyPanel';
import { generateContentPack } from './lib/generator';
import { industryPresets } from './lib/presets';
import type { BusinessProfile, Industry, Offer } from './lib/types';

const storageKey = 'business-content-studio-state-v1';

const defaultIndustry: Industry = '餐饮/夜宵店';
const defaultPreset = industryPresets[defaultIndustry];

const defaultProfile: BusinessProfile = {
  name: defaultPreset.exampleName,
  industry: defaultIndustry,
  city: '杭州湖滨',
  tone: '接地气',
  avgPrice: defaultPreset.avgPrice,
  signatureItems: defaultPreset.signatureItems,
};

const defaultOffer: Offer = {
  ...defaultPreset.offer,
  imagePreviewUrl: '',
};

type SavedState = {
  profile: BusinessProfile;
  offer: Offer;
};

function loadSavedState(): SavedState {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return { profile: defaultProfile, offer: defaultOffer };
    const parsed = JSON.parse(saved) as Partial<SavedState>;
    return {
      profile: { ...defaultProfile, ...parsed.profile },
      offer: { ...defaultOffer, ...parsed.offer },
    };
  } catch {
    return { profile: defaultProfile, offer: defaultOffer };
  }
}

export default function App() {
  const [{ profile, offer }, setState] = useState<SavedState>(loadSavedState);
  const [copyStatus, setCopyStatus] = useState('');
  const pack = useMemo(() => generateContentPack(profile, offer), [profile, offer]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ profile, offer }));
  }, [profile, offer]);

  function setProfile(nextProfile: BusinessProfile) {
    setState((current) => ({ ...current, profile: nextProfile }));
  }

  function setOffer(nextOffer: Offer) {
    setState((current) => ({ ...current, offer: nextOffer }));
  }

  function usePreset(industry: Industry) {
    const preset = industryPresets[industry];
    setState({
      profile: {
        name: preset.exampleName,
        industry,
        city: profile.city || '本地',
        tone: profile.tone,
        avgPrice: preset.avgPrice,
        signatureItems: preset.signatureItems,
      },
      offer: {
        ...preset.offer,
        imagePreviewUrl: offer.imagePreviewUrl,
      },
    });
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    setCopyStatus('已复制');
    window.setTimeout(() => setCopyStatus(''), 1600);
  }

  function resetDemo() {
    localStorage.removeItem(storageKey);
    setState({ profile: defaultProfile, offer: defaultOffer });
  }

  return (
    <main>
      <header className="topbar">
        <div className="brandLockup">
          <div className="brandIcon">
            <Store size={24} aria-hidden="true" />
          </div>
          <div>
            <p>Local Growth Desk</p>
            <h1>本地小商家内容工作台</h1>
          </div>
        </div>
        <div className="topbarActions">
          {copyStatus && (
            <span className="copyToast" role="status">
              <Check size={16} aria-hidden="true" />
              {copyStatus}
            </span>
          )}
          <button className="primaryButton" type="button" onClick={() => copyText(pack.calendar[0].postBody)}>
            <WandSparkles size={17} aria-hidden="true" />
            复制今日文案
          </button>
        </div>
      </header>

      <div className="appShell">
        <aside className="inputColumn" aria-label="输入区">
          <AppInstallPrompt />
          <BusinessForm profile={profile} onChange={setProfile} onUsePreset={usePreset} />
          <OfferForm offer={offer} onChange={setOffer} />
        </aside>

        <section className="outputColumn" aria-label="结果区">
          <ExportPanel profile={profile} offer={offer} pack={pack} onReset={resetDemo} />
          <ContentCalendar days={pack.calendar} onCopy={copyText} />
          <ReviewReplyPanel replies={pack.reviewReplies} onCopy={copyText} />
        </section>
      </div>
    </main>
  );
}
