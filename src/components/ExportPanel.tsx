import { Download, FileJson, FileText, RotateCcw } from 'lucide-react';
import type { Translations } from '../lib/i18n';
import type { BusinessProfile, GeneratedPack, LocaleCode, Offer } from '../lib/types';
import { serializeTextPack } from '../lib/generator';

type ExportPanelProps = {
  profile: BusinessProfile;
  offer: Offer;
  pack: GeneratedPack;
  locale: LocaleCode;
  t: Translations;
  onReset: () => void;
};

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ExportPanel({ profile, offer, pack, locale, t, onReset }: ExportPanelProps) {
  const safeName = (profile.name || 'business-content').replace(/[\\/:*?"<>|]/g, '-');

  return (
    <section className="exportBar" aria-label={t.export.title}>
      <div>
        <p className="eyebrow">{t.export.eyebrow}</p>
        <h2>{t.export.title}</h2>
      </div>
      <div className="exportActions">
        <button
          type="button"
          className="primaryButton"
          onClick={() => downloadFile(`${safeName}-content-pack.txt`, serializeTextPack(profile, offer, pack, locale), 'text/plain;charset=utf-8')}
        >
          <FileText size={17} aria-hidden="true" />
          {t.export.txt}
        </button>
        <button
          type="button"
          className="secondaryButton"
          onClick={() =>
            downloadFile(
              `${safeName}-项目数据.json`,
              JSON.stringify({ locale, profile, offer, pack }, null, 2),
              'application/json;charset=utf-8',
            )
          }
        >
          <FileJson size={17} aria-hidden="true" />
          {t.export.json}
        </button>
        <button type="button" className="ghostButton" onClick={onReset}>
          <RotateCcw size={16} aria-hidden="true" />
          {t.export.reset}
        </button>
        <span className="downloadHint">
          <Download size={15} aria-hidden="true" />
          {t.export.localOnly}
        </span>
      </div>
    </section>
  );
}
