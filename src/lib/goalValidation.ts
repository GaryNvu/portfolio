export type GoalInput = {
  title: string;
  targetCents: number;
  savedCents: number;
  image: string | null;
};

const MAX_AMOUNT_CENTS = 2_147_483_647;
const MAX_IMAGE_LENGTH = 2_500_000;

export function parseGoalInput(value: unknown): GoalInput | null {
  if (!value || typeof value !== 'object') return null;

  const input = value as Record<string, unknown>;
  if (typeof input.title !== 'string') return null;

  const title = input.title.trim();
  const target = Number(input.target);
  const saved = Number(input.saved);
  if (!title || title.length > 70 || !Number.isFinite(target) || !Number.isFinite(saved) || target <= 0 || saved < 0) return null;

  const targetCents = Math.round(target * 100);
  const savedCents = Math.round(saved * 100);
  if (targetCents > MAX_AMOUNT_CENTS || savedCents > MAX_AMOUNT_CENTS) return null;

  const imageValue = input.image;
  if (imageValue !== undefined && imageValue !== null && typeof imageValue !== 'string') return null;
  const image = typeof imageValue === 'string' && imageValue ? imageValue : null;
  if (image && (image.length > MAX_IMAGE_LENGTH || !/^data:image\/(?:jpeg|png|webp|gif);base64,/.test(image))) return null;

  return { title, targetCents, savedCents, image };
}

export function serializeGoal(goal: {
  id: string;
  title: string;
  targetCents: number;
  savedCents: number;
  image: string | null;
  updatedAt: Date;
}) {
  return {
    id: goal.id,
    title: goal.title,
    target: goal.targetCents / 100,
    saved: goal.savedCents / 100,
    image: goal.image ?? '',
    updatedAt: goal.updatedAt.getTime(),
  };
}