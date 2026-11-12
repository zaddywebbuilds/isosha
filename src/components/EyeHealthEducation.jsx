import { useState } from 'react';
import { images } from '../config/site.js';
import { sections } from '../config/copy.js';
import { Eyebrow, Icon, Img } from './ui.jsx';

const { eyeHealth } = sections;

/**
 * General eye-health education.
 *
 * Nothing in this section links a condition to Isosha. Every photograph here
 * is captioned or framed as educational or lifestyle photography, never as
 * evidence of a result, and each card ends by pointing the reader to a
 * professional. "Learn more" expands in place, so there are no outbound
 * claims and no broken links.
 */
const conditions = [
  {
    id: 'glaucoma',
    icon: 'eye',
    title: 'Understanding Glaucoma',
    image: 'examGlaucoma',
    moreImage: 'examGlaucomaDetail',
    summary:
      'Glaucoma is a group of eye diseases that can damage the optic nerve and lead to vision loss. Regular eye examinations and appropriate treatment are important for protecting sight.',
    more: 'Glaucoma often develops gradually and may not cause noticeable symptoms in its early stages, which is why routine eye examinations matter. An eye-care professional can measure eye pressure, examine the optic nerve and test the field of vision. Where treatment is prescribed, it is usually ongoing and should be followed exactly as directed.',
  },
  {
    id: 'cataracts',
    icon: 'lens',
    title: 'Understanding Cataracts',
    image: 'readingStrain',
    moreImage: 'readingStrainDetail',
    summary:
      'A cataract develops when the natural lens of the eye becomes cloudy, often causing blurry or reduced vision. An eye-care professional can recommend appropriate management and treatment.',
    more: 'People with cataracts often describe vision that is hazy, colours that look faded, or increased glare from headlights and sunlight. Cataracts are assessed by an eye-care professional, who will advise on the appropriate course of action for the individual, which may include surgery.',
  },
  {
    id: 'myopia',
    icon: 'focus',
    title: 'Understanding Myopia',
    image: 'distanceBlur',
    moreImage: 'distanceBlurDetail',
    summary:
      'Myopia, also called nearsightedness, makes distant objects appear blurry. Eye examinations help determine suitable vision correction options.',
    more: 'Myopia occurs when light entering the eye focuses in front of the retina rather than on it. It is commonly identified during a routine eye examination and is typically corrected with prescription glasses or contact lenses. An eye-care professional will advise on the correction that suits the individual.',
  },
];

function ConditionCard({ item, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `${item.id}-more`;

  return (
    <article
      className="reveal card flex flex-col overflow-hidden hover:border-leaf/40 transition-colors duration-300"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Img
        image={images[item.image]}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
        className="w-full aspect-[16/10] object-cover"
      />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <span
          className="grid place-items-center w-11 h-11 rounded-full bg-leaf-wash text-forest"
          aria-hidden="true"
        >
          <Icon name={item.icon} className="w-5 h-5" />
        </span>

        <h3 className="mt-4 text-[1.4rem] text-forest">{item.title}</h3>
        <p className="mt-3 text-[0.93rem] text-ink-soft leading-relaxed">
          {item.summary}
        </p>

        <div
          id={panelId}
          hidden={!open}
          className="mt-4 pt-4 border-t border-forest/10"
        >
          <p className="text-[0.9rem] text-ink-soft leading-relaxed">
            {item.more}
          </p>
          <Img
            image={images[item.moreImage]}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
            className="mt-4 w-full aspect-[16/9] object-cover rounded-xl"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-5 inline-flex items-center gap-2 self-start text-[0.85rem] font-bold text-forest hover:text-leaf transition-colors"
        >
          {open ? 'Show less' : 'Learn more'}
          <Icon
            name="arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              open ? '-rotate-90' : ''
            }`}
          />
        </button>
      </div>
    </article>
  );
}

function AnatomyFigure() {
  const [detail, setDetail] = useState(false);

  return (
    <figure className="reveal card overflow-hidden">
      <Img
        image={images.anatomyWide}
        sizes="(min-width: 1024px) 60vw, 92vw"
        className="w-full"
      />
      <figcaption className="p-6 sm:p-8 border-t border-forest/10">
        <p className="eyebrow text-[0.62rem] text-forest-line">
          The eye, labelled
        </p>
        <p className="mt-2.5 text-[0.9rem] text-ink-soft leading-relaxed">
          Light passes through the cornea and the lens and is focused onto the
          retina. The optic nerve carries that signal to the brain. The
          conditions described above affect different parts of this pathway,
          which is why each one is assessed and managed differently.
        </p>

        <button
          type="button"
          onClick={() => setDetail((v) => !v)}
          aria-expanded={detail}
          aria-controls="anatomy-detail"
          className="mt-5 inline-flex items-center gap-2 text-[0.85rem] font-bold text-forest hover:text-leaf transition-colors"
        >
          {detail ? 'Hide the detailed diagram' : 'See the detailed diagram'}
          <Icon
            name="arrow"
            className={`w-4 h-4 transition-transform duration-300 ${
              detail ? '-rotate-90' : ''
            }`}
          />
        </button>

        <div id="anatomy-detail" hidden={!detail} className="mt-5">
          <Img
            image={images.anatomyDetail}
            sizes="(min-width: 1024px) 50vw, 92vw"
            className="w-full rounded-xl border border-forest/10"
          />
          <p className="mt-3 text-[0.82rem] text-ink-soft">
            The same cross-section with the conjunctiva, ciliary body, vitreous
            body and choroid also labelled.
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function EyeHealthEducation() {
  return (
    <section
      id="eye-health"
      className="bg-mist py-12 md:py-16"
      aria-labelledby="eye-health-heading"
    >
      <div className="shell">
        <div className="reveal max-w-2xl">
          <Eyebrow>{eyeHealth.eyebrow}</Eyebrow>
          <h2
            id="eye-health-heading"
            className="mt-5 text-[2.1rem] sm:text-4xl lg:text-[2.9rem] leading-[1.08] text-forest"
          >
            {eyeHealth.headline}
          </h2>
          <p className="mt-5 text-ink-soft leading-relaxed">{eyeHealth.body}</p>
        </div>

        {/* Opening band */}
        <div className="reveal mt-8 overflow-hidden rounded-[1.5rem] border border-forest/10">
          <Img
            image={images.examWide}
            sizes="(min-width: 1280px) 76rem, 92vw"
            className="w-full aspect-[16/9] sm:aspect-[21/9] object-cover"
          />
        </div>

        {/* Conditions */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
          {conditions.map((item, i) => (
            <ConditionCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Anatomy and eye care in practice */}
        <div className="mt-6 grid lg:grid-cols-[1.35fr_0.65fr] gap-5 items-start">
          <AnatomyFigure />

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
            {['carePortraitB', 'carePortraitA'].map((key, i) => (
              <div
                key={key}
                style={{ transitionDelay: `${i * 90}ms` }}
                className="reveal card overflow-hidden"
              >
                <Img
                  image={images[key]}
                  sizes="(min-width: 1024px) 24vw, 46vw"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="reveal mt-7 flex items-start gap-2.5 text-[0.82rem] text-ink-soft/90 max-w-3xl">
          <Icon name="doc" className="w-4 h-4 mt-0.5 shrink-0 text-forest-line" />
          {eyeHealth.note}
        </p>
      </div>
    </section>
  );
}
