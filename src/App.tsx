import { useEffect, useMemo, useState } from 'react';
import { Check, Store, WandSparkles } from 'lucide-react';
import { AppInstallPrompt } from './components/AppInstallPrompt';
import { BusinessForm } from './components/BusinessForm';
import { ContentCalendar } from './components/ContentCalendar';
import { ExportPanel } from './components/ExportPanel';
import { LlmSettingsPanel } from './components/LlmSettingsPanel';
import { OfferForm } from './components/OfferForm';
import { ReviewReplyPanel } from './components/ReviewReplyPanel';
import { generateContentPack } from './lib/generator';
import { generateWithLlm } from './lib/llmClient';
import { industryPresets } from './lib/presets';
import type { BusinessProfile, GeneratedPack, GenerationMode, Industry, LlmSettings, Offer } from './lib/types';

const storageKey = 'business-content-studio-state-v1';
const llmStorageKey = 'business-content-studio-llm-settings-v1';
const llmApiKeyStorageKey = 'business-content-studio-llm-api-key-v1';

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

const defaultLlmSettings: LlmSettings = {
  endpoint: '',
  model: '',
  apiKey: '',
  extraHeaders: '',
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

function loadLlmSettings(): LlmSettings {
  try {
    const saved = localStorage.getItem(llmStorageKey);
    const parsed = saved ? (JSON.parse(saved) as Partial<LlmSettings>) : {};
    return {
      ...defaultLlmSettings,
      ...parsed,
      apiKey: sessionStorage.getItem(llmApiKeyStorageKey) || '',
    };
  } catch {
    return defaultLlmSettings;
  }
}

export default function App() {
  const [{ profile, offer }, setState] = useState<SavedState>(loadSavedState);
  const [mode, setMode] = useState<GenerationMode>('template');
  const [llmSettings, setLlmSettings] = useState<LlmSettings>(loadLlmSettings);
  const [llmPack, setLlmPack] = useState<GeneratedPack | null>(null);
  const [llmError, setLlmError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const templatePack = useMemo(() => generateContentPack(profile, offer), [profile, offer]);
  const pack = mode === 'llm' && llmPack ? llmPack : templatePack;

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ profile, offer }));
  }, [profile, offer]);

  useEffect(() => {
    const { apiKey, ...settingsWithoutKey } = llmSettings;
    localStorage.setItem(llmStorageKey, JSON.stringify(settingsWithoutKey));
    if (apiKey) sessionStorage.setItem(llmApiKeyStorageKey, apiKey);
    else sessionStorage.removeItem(llmApiKeyStorageKey);
  }, [llmSettings]);

  function setProfile(nextProfile: BusinessProfile) {
    setState((current) => ({ ...current, profile: nextProfile }));
    setLlmPack(null);
    setLlmError('');
  }

  function setOffer(nextOffer: Offer) {
    setState((current) => ({ ...current, offer: nextOffer }));
    setLlmPack(null);
    setLlmError('');
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
    setLlmPack(null);
    setLlmError('');
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    setCopyStatus('已复制');
    window.setTimeout(() => setCopyStatus(''), 1600);
  }

  function resetDemo() {
    localStorage.removeItem(storageKey);
    setState({ profile: defaultProfile, offer: defaultOffer });
    setLlmPack(null);
    setLlmError('');
  }

  async function generateLlmPack() {
    setIsGenerating(true);
    setLlmError('');
    try {
      const result = await generateWithLlm(profile, offer, llmSettings);
      setLlmPack(result.pack);
    } catch (error) {
      setLlmError(error instanceof Error ? error.message : 'LLM 生成失败');
    } finally {
      setIsGenerating(false);
    }
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
          <LlmSettingsPanel
            mode={mode}
            settings={llmSettings}
            isGenerating={isGenerating}
            error={llmError}
            onModeChange={setMode}
            onSettingsChange={setLlmSettings}
            onGenerate={generateLlmPack}
          />
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
