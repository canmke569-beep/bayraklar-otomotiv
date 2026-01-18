import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'src/data/siteData.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    return NextResponse.json({
      vehicles: data.vehicles,
      team: data.team,
      socialMedia: data.socialMedia || [],
      heroImages: data.heroImages || [],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
