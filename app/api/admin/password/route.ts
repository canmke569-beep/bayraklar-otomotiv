import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();
    
    const dataPath = path.join(process.cwd(), 'src/data/siteData.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Check current password
    if (currentPassword !== data.admin.password) {
      return NextResponse.json({ success: false, message: 'Mevcut şifre hatalı' });
    }
    
    // Update password
    data.admin.password = newPassword;
    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: 'Şifre başarıyla değiştirildi' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Bir hata oluştu' }, { status: 500 });
  }
}
