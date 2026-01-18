import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const dataPath = path.join(process.cwd(), 'src/data/siteData.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    if (username === data.admin.username && password === data.admin.password) {
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      return NextResponse.json({ success: true, token });
    }
    
    return NextResponse.json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
