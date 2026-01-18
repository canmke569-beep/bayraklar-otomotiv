import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/siteData.json');

// GET - Get current security code
export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return NextResponse.json({ code: data.securityCode || '' });
  } catch {
    return NextResponse.json({ code: '' });
  }
}

// POST - Verify or update security code
export async function POST(request: Request) {
  try {
    const { action, code, newCode } = await request.json();
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    if (action === 'verify') {
      if (data.securityCode === code) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, error: 'Geçersiz kod' });
      }
    }

    if (action === 'update') {
      data.securityCode = newCode;
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Geçersiz işlem' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Bir hata oluştu' }, { status: 500 });
  }
}
