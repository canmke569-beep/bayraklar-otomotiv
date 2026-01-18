import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { username, success: loginSuccess } = await request.json();
    const now = new Date();
    const timeStr = now.toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' });

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bayraklarotomotiv@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || '',
      },
    });

    // Send notification email
    await transporter.sendMail({
      from: '"Bayraklar Otomotiv" <bayraklarotomotiv@gmail.com>',
      to: 'bayraklarotomotiv@gmail.com',
      subject: loginSuccess ? '✅ Admin Panel Giriş Yapıldı' : '⚠️ Admin Panel Giriş Denemesi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; margin: 0;">Bayraklar Otomotiv</h1>
            <p style="color: #666;">Admin Panel Bildirim</p>
          </div>
          
          <div style="background: ${loginSuccess ? '#dcfce7' : '#fef2f2'}; border-radius: 16px; padding: 30px; border-left: 4px solid ${loginSuccess ? '#22c55e' : '#ef4444'};">
            <h2 style="color: ${loginSuccess ? '#166534' : '#991b1b'}; margin: 0 0 15px 0;">
              ${loginSuccess ? '✅ Başarılı Giriş' : '⚠️ Başarısız Giriş Denemesi'}
            </h2>
            <p style="color: #333; margin: 5px 0;"><strong>Kullanıcı:</strong> ${username || 'Bilinmiyor'}</p>
            <p style="color: #333; margin: 5px 0;"><strong>Tarih:</strong> ${timeStr}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>Bu bildirim admin panel güvenliği için gönderilmiştir.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
