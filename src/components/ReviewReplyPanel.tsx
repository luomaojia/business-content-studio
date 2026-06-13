import { Copy, MessageSquareReply } from 'lucide-react';
import type { Translations } from '../lib/i18n';
import type { ReviewReplies } from '../lib/types';

type ReviewReplyPanelProps = {
  replies: ReviewReplies;
  t: Translations;
  onCopy: (text: string) => void;
};

const replyKeys: Array<keyof ReviewReplies> = [
  'positive',
  'negative',
  'slowService',
  'priceConcern',
  'refund',
];

export function ReviewReplyPanel({ replies, t, onCopy }: ReviewReplyPanelProps) {
  const replyLabels: Record<keyof ReviewReplies, string> = {
    positive: t.reviews.positive,
    negative: t.reviews.negative,
    slowService: t.reviews.slowService,
    priceConcern: t.reviews.priceConcern,
    refund: t.reviews.refund,
  };

  return (
    <section className="resultsBlock" aria-labelledby="review-heading">
      <div className="sectionTitle">
        <MessageSquareReply size={21} aria-hidden="true" />
        <div>
          <p className="eyebrow">{t.reviews.eyebrow}</p>
          <h2 id="review-heading">{t.reviews.title}</h2>
        </div>
      </div>

      <div className="replyGrid">
        {replyKeys.map((key) => (
          <article className="replyCard" key={key}>
            <div className="replyHeader">
              <h3>{replyLabels[key]}</h3>
              <button
                type="button"
                className="iconButton"
                title={replyLabels[key]}
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
