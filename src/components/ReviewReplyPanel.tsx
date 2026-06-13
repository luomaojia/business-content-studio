import { Copy, MessageSquareReply } from 'lucide-react';
import type { ReviewReplies } from '../lib/types';

type ReviewReplyPanelProps = {
  replies: ReviewReplies;
  onCopy: (text: string) => void;
};

const replyLabels: Array<[keyof ReviewReplies, string]> = [
  ['positive', '好评感谢'],
  ['negative', '差评安抚'],
  ['slowService', '服务慢解释'],
  ['priceConcern', '价格质疑'],
  ['refund', '退款沟通'],
];

export function ReviewReplyPanel({ replies, onCopy }: ReviewReplyPanelProps) {
  return (
    <section className="resultsBlock" aria-labelledby="review-heading">
      <div className="sectionTitle">
        <MessageSquareReply size={21} aria-hidden="true" />
        <div>
          <p className="eyebrow">Reviews</p>
          <h2 id="review-heading">点评回复模板</h2>
        </div>
      </div>

      <div className="replyGrid">
        {replyLabels.map(([key, label]) => (
          <article className="replyCard" key={key}>
            <div className="replyHeader">
              <h3>{label}</h3>
              <button
                type="button"
                className="iconButton"
                title={`复制${label}`}
                onClick={() => onCopy(replies[key])}
              >
                <Copy size={16} aria-hidden="true" />
              </button>
            </div>
            <p>{replies[key]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
