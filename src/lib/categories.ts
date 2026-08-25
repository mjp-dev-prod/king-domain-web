// Service families from the product vision (§10). Kept deliberately broad —
// the real taxonomy is still an open decision, and what people pick here is
// part of how we answer it.
export const CATEGORIES = [
  'Software & tech',
  'Design & creative',
  'Video & media',
  'Writing & content',
  'Marketing & growth',
  'Tutoring & training',
  'Research & admin',
  'Audio & voice',
] as const

export type Category = (typeof CATEGORIES)[number]
