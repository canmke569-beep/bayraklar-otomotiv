import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { team } = await request.json();
    
    const dataPath = path.join(process.cwd(), 'src/data/siteData.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    data.team = team;
    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save team' }, { status: 500 });
  }
}
