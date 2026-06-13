import { Bot, KeyRound, Loader2, WandSparkles } from 'lucide-react';
import type { Translations } from '../lib/i18n';
import type { GenerationMode, LlmProvider, LlmSettings } from '../lib/types';

type LlmSettingsPanelProps = {
  mode: GenerationMode;
  settings: LlmSettings;
  t: Translations;
  isGenerating: boolean;
  error: string;
  onModeChange: (mode: GenerationMode) => void;
  onSettingsChange: (settings: LlmSettings) => void;
  onGenerate: () => void;
};

const providerPresets: Record<Exclude<LlmProvider, 'custom'>, Pick<LlmSettings, 'endpoint' | 'model' | 'extraHeaders'>> = {
  deepseek: {
    endpoint: 'https://api.deepseek.com/chat/completions',
    model: 'deepseek-v4-flash',
    extraHeaders: '',
  },
  mimo: {
    endpoint: 'https://api.xiaomimimo.com/v1/chat/completions',
    model: 'mimo-v2.5-pro',
    extraHeaders: '',
  },
};

export function LlmSettingsPanel({
  mode,
  settings,
  t,
  isGenerating,
  error,
  onModeChange,
  onSettingsChange,
  onGenerate,
}: LlmSettingsPanelProps) {
  function update<K extends keyof LlmSettings>(key: K, value: LlmSettings[K]) {
    onSettingsChange({ ...settings, [key]: value });
  }

  function updateProvider(provider: LlmProvider) {
    if (provider === 'custom') {
      onSettingsChange({ ...settings, provider });
      return;
    }

    onSettingsChange({
      ...settings,
      provider,
      ...providerPresets[provider],
    });
  }

  return (
    <section className="panel" aria-labelledby="llm-heading">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">{t.llm.eyebrow}</p>
          <h2 id="llm-heading">{t.llm.title}</h2>
        </div>
        <Bot size={22} aria-hidden="true" />
      </div>

      <div className="segmentedControl" role="group" aria-label={t.llm.modeLabel}>
        <button
          type="button"
          className={mode === 'template' ? 'segmentButton active' : 'segmentButton'}
          onClick={() => onModeChange('template')}
        >
          {t.llm.template}
        </button>
        <button
          type="button"
          className={mode === 'llm' ? 'segmentButton active' : 'segmentButton'}
          onClick={() => onModeChange('llm')}
        >
          {t.llm.api}
        </button>
      </div>

      {mode === 'llm' && (
        <>
          <p className="helperText">{t.llm.setupHint}</p>

          <label>
            {t.llm.provider}
            <select value={settings.provider} onChange={(event) => updateProvider(event.target.value as LlmProvider)}>
              <option value="custom">{t.llm.providerCustom}</option>
              <option value="deepseek">{t.llm.providerDeepSeek}</option>
              <option value="mimo">{t.llm.providerMimo}</option>
            </select>
          </label>

          <label>
            {t.llm.endpoint}
            <input
              value={settings.endpoint}
              onChange={(event) => update('endpoint', event.target.value)}
              placeholder={t.llm.endpointPlaceholder}
            />
          </label>

          <div className="fieldGrid">
            <label>
              {t.llm.model}
              <input
                value={settings.model}
                onChange={(event) => update('model', event.target.value)}
                placeholder={t.llm.modelPlaceholder}
              />
            </label>

            <label>
              {t.llm.apiKey}
              <span className="passwordInput">
                <KeyRound size={15} aria-hidden="true" />
                <input
                  value={settings.apiKey}
                  onChange={(event) => update('apiKey', event.target.value)}
                  placeholder="sk-..."
                  type="password"
                />
              </span>
            </label>
          </div>

          <details className="advancedSettings">
            <summary>{t.llm.advancedSettings}</summary>
            <label>
              {t.llm.extraHeaders}
              <textarea
                value={settings.extraHeaders}
                onChange={(event) => update('extraHeaders', event.target.value)}
                placeholder={t.llm.extraHeadersPlaceholder}
                rows={3}
              />
            </label>
          </details>

          {error && <p className="errorText">{error}</p>}

          <button type="button" className="primaryButton" onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="spinIcon" size={17} aria-hidden="true" /> : <WandSparkles size={17} aria-hidden="true" />}
            {isGenerating ? t.llm.generating : t.llm.generate}
          </button>
        </>
      )}
    </section>
  );
}
