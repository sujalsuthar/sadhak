import { getMantras, saveMantras } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const mantras = await getMantras();
    return NextResponse.json(mantras);
  } catch (error) {
    console.error('API GET Error (mantras):', error);
    return NextResponse.json({ message: 'Error fetching mantras' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const mantras = await request.json();
    await saveMantras(mantras);
    return NextResponse.json({ message: 'Mantras updated successfully' });
  } catch (error) {
    console.error('API PUT Error (mantras):', error);
    return NextResponse.json({ message: 'Error updating mantras' }, { status: 500 });
  }
} 