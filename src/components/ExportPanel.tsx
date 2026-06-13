import { Download, FileJson, FileText, RotateCcw } from 'lucide-react';
import type { BusinessProfile, GeneratedPack, Offer } from '../lib/types';
import { serializeTextPack } from '../lib/generator';

type ExportPanelProps = {
  profile: BusinessProfile;
  offer: Offer;
  pack: GeneratedPack;
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

export function ExportPanel({ profile, offer, pack, onReset }: ExportPanelProps) {
  const safeName = (profile.name || 'business-content').replace(/[\\/:*?"<>|]/g, '-');

  return (
    <section className="exportBar" aria-label="导出操作">
      <div>
        <p className="eyebrow">Export</p>
        <h2>内容包导出</h2>
      </div>
      <div className="exportActions">
        <button
          type="button"
          className="primaryButton"
          onClick={() => downloadFile(`${safeName}-一周内容包.txt`, serializeTextPack(profile, offer, pack), 'text/plain;charset=utf-8')}
        >
          <FileText size={17} aria-hidden="true" />
          导出 TXT
        </button>
        <button
          type="button"
          className="secondaryButton"
          onClick={() =>
            downloadFile(
              `${safeName}-项目数据.json`,
              JSON.stringify({ profile, offer, pack }, null, 2),
              'application/json;charset=utf-8',
            )
          }
        >
          <FileJson size={17} aria-hidden="true" />
          导出 JSON
        </button>
        <button type="button" className="ghostButton" onClick={onReset}>
          <RotateCcw size={16} aria-hidden="true" />
          重置样例
        </button>
        <span className="downloadHint">
          <Download size={15} aria-hidden="true" />
          本地生成，无需登录
        </span>
      </div>
    </section>
  );
}
