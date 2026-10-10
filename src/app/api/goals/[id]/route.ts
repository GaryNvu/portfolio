import { NextRequest, NextResponse } from 'next/server';
import { parseGoalInput, serializeGoal } from '@/lib/goalValidation';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

type GoalRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: GoalRouteContext) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const input = parseGoalInput(body);
  if (!input) return NextResponse.json({ error: 'Les informations de l’objectif sont invalides.' }, { status: 400 });

  try {
    const { id } = await context.params;
    const goal = await prisma.savingsGoal.update({ where: { id }, data: input });
    return NextResponse.json(serializeGoal(goal));
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: 'Objectif introuvable.' }, { status: 404 });
    }
    console.error('Unable to update savings goal:', error);
    return NextResponse.json({ error: 'Base de données indisponible.' }, { status: 503 });
  }
}