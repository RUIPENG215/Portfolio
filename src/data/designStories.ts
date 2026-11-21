import type { CaseStory } from './types';

/*
  Case-study content for the design projects that use the shared template
  (src/pages/ProjectCaseStudy.tsx). Ratios are width / height of each file.
*/

const L = '/Design_1';
export const lampStory: CaseStory = {
  hero: { src: `${L}/Hero_lamp.webp`, alt: 'The lamp folded, standing beside a potted plant', ratio: 1.5, position: '50% 58%' },
  sub: 'A foldable lamp that moves from focused work light to warm ambient glow.',
  meta: [
    { k: 'Type', v: 'Team project' },
    { k: 'Focus', v: 'Lighting, mechanism' },
    { k: 'Status', v: 'Completed' },
  ],
  facts: [
    { k: 'Type', v: 'Team project' },
    { k: 'For', v: 'Students living off campus, in shared apartments and small studios' },
    { k: 'Light', v: 'Up to 500 lux across a 700 × 450 mm surface' },
    { k: 'Focus', v: 'Lighting, portability, mechanism' },
  ],
  lead: 'A sculptural, foldable lamp that turns from a focused work light into a warm ambient glow, and goes wherever you carry it.',
  body: [
    'Beyond portability and function, the lamp explores how light can follow a day: working, resting, or moving between spaces. Less a fixture than a companion that brings warmth along.',
  ],
  sections: [
    {
      label: 'Context',
      title: 'One room, every use.',
      body: [
        'Designed for university students living off campus in shared apartments and small studios, where one desk serves reading, study, work and decoration. The lamp gives them portable, adaptable light for all of it.',
      ],
      media: [
        { kind: 'row', items: [
          { src: `${L}/Lamp1.webp`, alt: 'A hand lifting the lamp by its handle', ratio: 1452 / 1572, caption: 'Carried by the handle.' },
          { src: `${L}/Lamp2.webp`, alt: 'A finger turning the orange dial at the base of the lamp', ratio: 1548 / 1671, caption: 'Set at the dial.' },
        ] },
      ],
    },
    {
      label: 'Light',
      title: 'Focused when unfolded, ambient when not.',
      body: [
        'Unfolded, the arm puts up to 500 lux of focused light across a 700 × 450 mm surface. Brightness and colour temperature are adjustable, for comfortable, eye-friendly light when reading, studying and working.',
      ],
      media: [
        { kind: 'full', item: { src: `${L}/Detail1_lamp.webp`, alt: 'The light bar on its arm, unfolded from the body', ratio: 1.5 } },
        { kind: 'row', items: [
          { src: `${L}/details.90.1.webp`, alt: 'The dial at the base, with brightness and colour-temperature marks', ratio: 1.5, caption: 'Brightness and colour temperature, set from the base.' },
          { src: `${L}/2.78.webp`, alt: 'The lamp glowing at night', ratio: 1212 / 1200, caption: 'Ambient glow.' },
        ] },
      ],
    },
    {
      label: 'Details',
      title: 'Made to be handled.',
      media: [
        { kind: 'grid', cols: 2, ratio: 1.5, caption: 'The arm socket, the handle, its parts, and the base with the charging port.', items: [
          { src: `${L}/details.102.1.webp`, alt: 'The socket where the arm folds into the top of the body', ratio: 1.5 },
          { src: `${L}/details.90.3.webp`, alt: 'The handle and textured sleeve', ratio: 1.5 },
          { src: `${L}/details.81.2.webp`, alt: 'The handle seated on the top of the lamp', ratio: 1.5 },
          { src: `${L}/details.81.3.webp`, alt: 'The underside of the base with its charging port', ratio: 1.5 },
        ] },
      ],
    },
    {
      label: 'Mechanism',
      title: 'Hidden inside the body.',
      tone: 'tint',
      body: [
        'The folding mechanism lives inside the body, so the lamp reads as one simple form. Exploded views show how it is put together.',
      ],
      media: [
        { kind: 'row', items: [
          { src: `${L}/details.110.1.webp`, alt: 'Exploded view of the lamp', ratio: 0.75, contain: true, caption: 'Exploded view.' },
          { src: `${L}/details.81.1.webp`, alt: 'Exploded view of the handle', ratio: 1.5, contain: true, caption: 'The handle, taken apart.' },
        ] },
        { kind: 'full', item: { src: `${L}/Assem drawing.png`, alt: 'Assembly drawing of the lamp with section A-A and parts list', ratio: 4678 / 3308, contain: true, caption: 'Assembly drawing, with section and parts list.' } },
      ],
    },
    {
      label: 'Colour',
      title: 'Other colourways.',
      media: [
        { kind: 'grid', cols: 4, ratio: 0.8, caption: 'Colourways by other members of the team.', items: [
          { src: `${L}/other colors.112.webp`, alt: 'White colourway', ratio: 1.6 },
          { src: `${L}/other colors.114.webp`, alt: 'Black and red colourway', ratio: 1.6 },
          { src: `${L}/other colors.115.webp`, alt: 'White and cyan colourway', ratio: 1.6 },
          { src: `${L}/other color.webp`, alt: 'Yellow and purple colourway', ratio: 1.6 },
        ] },
      ],
    },
  ],
  close: 'Wherever you go, your glow follows.',
};

const B = '/Design_5';
export const microclimateStory: CaseStory = {
  hero: { src: `${B}/D5_H.webp`, alt: 'A hospital bed drawn in glowing lines, warm air at one end and cool at the other', ratio: 1980 / 1113, dark: true },
  sub: 'An interactive thermal comfort system for orthopedic wards.',
  meta: [
    { k: 'Type', v: 'Research project' },
    { k: 'Setting', v: 'Orthopedic wards' },
    { k: 'Built', v: 'FPC sensors, CFD' },
  ],
  facts: [
    { k: 'Type', v: 'Research project, with hospitals in Zhangjiakou' },
    { k: 'Setting', v: 'Orthopedic wards' },
    { k: 'Senses', v: 'Skin moisture and galvanic skin response (GSR)' },
    { k: 'Methods', v: 'Questionnaires, sensor prototyping, flexible printed circuits, CFD simulation' },
  ],
  lead: 'In an orthopedic ward, what feels comfortable varies sharply from one patient to the next. Bio-Adaptive Microclimate measures how each patient feels, and tunes the air around their bed to match.',
  body: [
    'The idea came out of field research. The system carries several sensors on flexible printed circuits that monitor skin moisture and galvanic skin response in real time, so each patient’s perception of their environment can be measured rather than guessed.',
  ],
  sections: [
    {
      label: 'Research',
      title: 'Comfort differs from bed to bed.',
      media: [
        { kind: 'boards', items: [
          { src: `${B}/P1.webp`, alt: 'Board: thermal comfort study and classification of orthopedic patients', ratio: 2044 / 1190, caption: 'Thermal comfort study: the challenges and needs of orthopedic patients.' },
          { src: `${B}/P2.webp`, alt: 'Board: questionnaire results, indicators and research analysis', ratio: 2198 / 1190, caption: 'Analysis: findings turned into thermal indicators and patient profiles.' },
        ] },
      ],
    },
    {
      label: 'Engagement',
      title: 'From feelings to data.',
      tone: 'dark',
      media: [
        { kind: 'boards', items: [
          { src: `${B}/P3.webp`, alt: 'Board: the engagement tool and how patients report how they feel', ratio: 2438 / 1190, caption: 'Interaction concept: a tactile tool that connects what patients feel with physiological data.' },
        ] },
      ],
    },
    {
      label: 'Sensing',
      title: 'Sensors that stay out of the way.',
      media: [
        { kind: 'boards', items: [
          { src: `${B}/P4.webp`, alt: 'Board: sensor prototype experiments on the hand', ratio: 2628 / 1190, caption: 'Sensor development: real-time acquisition of skin moisture and GSR.' },
          { src: `${B}/P5.webp`, alt: 'Board: experimental data analysis, integrated design and PCB design', ratio: 2670 / 1190, caption: 'Hardware refinement: flexible printed circuits, for a non-intrusive experience.' },
        ] },
      ],
    },
    {
      label: 'Microclimate',
      title: 'Air where the patient lies.',
      tone: 'dark',
      media: [
        { kind: 'boards', items: [
          { src: `${B}/P6.webp`, alt: 'Board: wearable design and airflow simulation around the sickbed', ratio: 2320 / 1190, caption: 'Validation: CFD simulation of airflow and thermal comfort around the bed.' },
          { src: `${B}/P7.webp`, alt: 'Board: modelling process and the system heating and cooling at the bedside', ratio: 2530 / 1190, caption: 'Integration: the complete system responding at the bedside.' },
        ] },
      ],
    },
  ],
  close: 'Recovery supported by an environment that breathes with the patient.',
};
