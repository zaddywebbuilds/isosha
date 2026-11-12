import { announcement, announcementShort } from '../config/site.js';
import { Icon } from './ui.jsx';

/**
 * The long form wraps to two lines on a 320px screen and costs 45px of a
 * 720px viewport before the page has said anything, so phones get the short
 * string. Only one is ever rendered to a screen reader.
 */
export default function AnnouncementBar() {
  return (
    <div className="bg-forest-deep text-white/85">
      <div className="shell flex items-center justify-center gap-2.5 py-2 sm:py-2.5 text-center">
        <Icon name="truck" className="w-4 h-4 text-gold shrink-0" />
        <p className="eyebrow leading-tight">
          <span className="sm:hidden">{announcementShort}</span>
          <span className="hidden sm:inline">{announcement}</span>
        </p>
      </div>
    </div>
  );
}
