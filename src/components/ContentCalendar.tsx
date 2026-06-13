import { CalendarDays, Copy, Image, Video } from 'lucide-react';
import type { Translations } from '../lib/i18n';
import type { GeneratedDay } from '../lib/types';

type ContentCalendarProps = {
  days: GeneratedDay[];
  t: Translations;
  onCopy: (text: string) => void;
};

export function ContentCalendar({ days, t, onCopy }: ContentCalendarProps) {
  return (
    <section className="resultsBlock" aria-labelledby="calendar-heading">
      <div className="sectionTitle">
        <CalendarDays size={21} aria-hidden="true" />
        <div>
          <p className="eyebrow">{t.calendar.eyebrow}</p>
          <h2 id="calendar-heading">{t.calendar.title}</h2>
        </div>
      </div>

      <div className="calendarGrid">
        {days.map((day) => (
          <article className="contentCard" key={`${day.day}-${day.theme}`}>
            <div className="cardTopline">
              <span>{day.day}</span>
              <strong>{day.theme}</strong>
              <time>{day.publishTime}</time>
            </div>
            <h3>{day.title}</h3>
            <p className="postBody">{day.postBody}</p>
            <div className="tagRow">
              {day.hashtags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="scriptBox">
              <Video size={16} aria-hidden="true" />
              <p>{day.videoScript}</p>
            </div>
            <div className="scriptBox muted">
              <Image size={16} aria-hidden="true" />
              <p>{day.imageSuggestion}</p>
            </div>
            <button
              type="button"
              className="iconButton textButton"
              onClick={() =>
                onCopy(
                  `${day.title}\n\n${day.postBody}\n\n${day.hashtags.join(' ')}\n\n${t.calendar.videoScript}:\n${day.videoScript}`,
                )
              }
              title={t.calendar.copyDay}
            >
              <Copy size={16} aria-hidden="true" />
              {t.calendar.copyDay}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
