import { Bot, KeyRound, Loader2, WandSparkles } from 'lucide-react';
import type { GenerationMode, LlmSettings } from '../lib/types';

type LlmSettingsPanelProps = {
  mode: GenerationMode;
  settings: LlmSettings;
  isGenerating: boolean;
  error: string;
  onModeChange: (mode: GenerationMode) => void;
  onSettingsChange: (settings: LlmSettings) => void;
  onGenerate: () => void;
};

export function LlmSettingsPanel({
  mode,
  settings,
  isGenerating,
  error,
  onModeChange,
  onSettingsChange,
  onGenerate,
}: LlmSettingsPanelProps) {
  function update<K extends keyof LlmSettings>(key: K, value: LlmSettings[K]) {
    onSettingsChange({ ...settings, [key]: value });
  }

  return (
    <section className="panel" aria-labelledby="llm-heading">
      <div className="panelHeader">
        <div>
          <p className="eyebrow">AI Mode</p>
          <h2 id="llm-heading">文案生成方式</h2>
        </div>
        <Bot size={22} aria-hidden="true" />
      </div>

      <div className="segmentedControl" role="group" aria-label="生成方式">
        <button
          type="button"
          className={mode === 'template' ? 'segmentButton active' : 'segmentButton'}
          onClick={() => onModeChange('template')}
        >
          模板
        </button>
        <button
          type="button"
          className={mode === 'llm' ? 'segmentButton active' : 'segmentButton'}
          onClick={() => onModeChange('llm')}
        >
          LLM API
        </button>
      </div>

      {mode === 'llm' && (
        <>
          <label>
            API 地址
            <input
              value={settings.endpoint}
              onChange={(event) => update('endpoint', event.target.value)}
              placeholder="https://api.example.com/v1/chat/completions"
            />
          </label>

          <div className="fieldGrid">
            <label>
              模型
              <input
                value={settings.model}
                onChange={(event) => update('model', event.target.value)}
                placeholder="例如：gpt-4o-mini / deepseek-chat"
              />
            </label>

            <label>
              API Key
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

          <label>
            自定义请求头 JSON
            <textarea
              value={settings.extraHeaders}
              onChange={(event) => update('extraHeaders', event.target.value)}
              placeholder='例如：{"HTTP-Referer":"https://your-site.com","X-Title":"内容工作台"}'
              rows={3}
            />
          </label>

          {error && <p className="errorText">{error}</p>}

          <button type="button" className="primaryButton" onClick={onGenerate} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="spinIcon" size={17} aria-hidden="true" /> : <WandSparkles size={17} aria-hidden="true" />}
            {isGenerating ? '生成中' : '使用 LLM 生成'}
          </button>
        </>
      )}
    </section>
  );
}
