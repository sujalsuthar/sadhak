import { getVideos, saveVideos } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const videos = await getVideos();
    return NextResponse.json(videos);
  } catch (error) {
    console.error('API GET Error (videos):', error);
    return NextResponse.json({ message: 'Error fetching videos' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const videos = await request.json();
    await saveVideos(videos);
    return NextResponse.json({ message: 'Videos updated successfully' });
  } catch (error) {
    console.error('API PUT Error (videos):', error);
    return NextResponse.json({ message: 'Error updating videos' }, { status: 500 });
  }
} 