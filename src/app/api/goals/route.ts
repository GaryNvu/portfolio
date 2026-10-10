import { NextRequest, NextResponse } from 'next/server';
import { parseGoalInput, serializeGoal } from '@/lib/goalValidation';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const goals = await prisma.savingsGoal.findMany({ orderBy: { updatedAt: 'desc' } });
    return NextResponse.json(goals.map(serializeGoal));
  } catch (error) {
    console.error('Unable to load savings goals:', error);
    return NextResponse.json({ error: 'Base de données indisponible.' }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  const input = parseGoalInput(body);
  if (!input) return NextResponse.json({ error: 'Les informations de l’objectif sont invalides.' }, { status: 400 });

  try {
    const goal = await prisma.savingsGoal.create({ data: input });
    return NextResponse.json(serializeGoal(goal), { status: 201 });
  } catch (error) {
    console.error('Unable to create savings goal:', error);
    return NextResponse.json({ error: 'Base de données indisponible.' }, { status: 503 });
  }
}