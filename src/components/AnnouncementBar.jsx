import { announcement } from '../config/site.js';
import { Icon } from './ui.jsx';

export default function AnnouncementBar() {
  return (
    <div className="bg-forest-deep text-white/85">
      <div className="shell flex items-center justify-center gap-2.5 py-2.5 text-center">
        <Icon name="truck" className="w-4 h-4 text-gold shrink-0" />
        <p className="eyebrow text-[0.62rem] sm:text-[0.7rem] leading-tight">
          {announcement}
        </p>
      </div>
    </div>
  );
}
