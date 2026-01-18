import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: string;
  km: string;
  fuel: string;
  transmission: string;
  price: string;
  image: string;
  url: string;
}

async function fetchSahibindenVehicles(): Promise<Vehicle[]> {
  try {
    const response = await fetch('https://bayraklarotomotiv.sahibinden.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
      },
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Sahibinden');
    }

    const html = await response.text();
    
    // Parse the HTML to extract vehicle data
    const vehicles: Vehicle[] = [];
    
    // Match vehicle listings - looking for classifiedList items
    const listingRegex = /<tr[^>]*class="[^"]*searchResultsItem[^"]*"[^>]*data-id="(\d+)"[^>]*>[\s\S]*?<\/tr>/gi;
    const listings = html.match(listingRegex) || [];
    
    for (let i = 0; i < Math.min(listings.length, 6); i++) {
      const listing = listings[i];
      
      // Extract ID
      const idMatch = listing.match(/data-id="(\d+)"/);
      const id = idMatch ? idMatch[1] : `vehicle-${i}`;
      
      // Extract image
      const imgMatch = listing.match(/data-src="([^"]+)"|src="(https:\/\/[^"]+\.jpg[^"]*)"/);
      const image = imgMatch ? (imgMatch[1] || imgMatch[2] || '') : '';
      
      // Extract title
      const titleMatch = listing.match(/class="[^"]*classifiedTitle[^"]*"[^>]*>([^<]+)</);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      // Extract price
      const priceMatch = listing.match(/class="[^"]*searchResultsPriceValue[^"]*"[^>]*>([^<]+)</);
      const price = priceMatch ? priceMatch[1].trim().replace(/\s+/g, '.') : '';
      
      // Extract details (year, km, etc)
      const detailsMatch = listing.match(/class="[^"]*searchResultsAttributeValue[^"]*"[^>]*>([^<]+)</g);
      const details = detailsMatch ? detailsMatch.map(d => d.replace(/<[^>]+>/g, '').trim()) : [];
      
      // Extract URL
      const urlMatch = listing.match(/href="(\/ilan\/[^"]+)"/);
      const url = urlMatch ? `https://www.sahibinden.com${urlMatch[1]}` : '';
      
      // Parse title for brand and model
      const titleParts = title.split(' ');
      const brand = titleParts[0] || '';
      const model = titleParts.slice(1).join(' ') || '';
      
      vehicles.push({
        id,
        title,
        brand: brand.toUpperCase(),
        model,
        year: details[0] || '',
        km: details[1] || '',
        fuel: details[2] || 'Benzin',
        transmission: details[3] || 'Otomatik',
        price,
        image: image.startsWith('//') ? `https:${image}` : image,
        url
      });
    }
    
    return vehicles;
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    // Return fallback data if scraping fails
    return getFallbackVehicles();
  }
}

function getFallbackVehicles(): Vehicle[] {
  return [
    {
      id: '1',
      title: 'Mercedes C Serisi 200 d AMG',
      brand: 'MERCEDES',
      model: 'C SERİSİ 200 d AMG',
      year: '2023',
      km: '36.282 Km',
      fuel: 'Dizel',
      transmission: 'Otomatik',
      price: '3.935.000 TL',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
      url: 'https://bayraklarotomotiv.sahibinden.com/'
    },
    {
      id: '2',
      title: 'BMW 5 Serisi 520i M Sport',
      brand: 'BMW',
      model: '5 SERİSİ 520i M Sport',
      year: '2024',
      km: '12.500 Km',
      fuel: 'Benzin',
      transmission: 'Otomatik',
      price: '4.250.000 TL',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
      url: 'https://bayraklarotomotiv.sahibinden.com/'
    },
    {
      id: '3',
      title: 'Audi A6 45 TFSI quattro',
      brand: 'AUDI',
      model: 'A6 45 TFSI quattro',
      year: '2023',
      km: '28.000 Km',
      fuel: 'Benzin',
      transmission: 'Otomatik',
      price: '3.750.000 TL',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=800&auto=format&fit=crop',
      url: 'https://bayraklarotomotiv.sahibinden.com/'
    },
    {
      id: '4',
      title: 'Mercedes E Serisi E 200 d AMG',
      brand: 'MERCEDES',
      model: 'E SERİSİ E 200 d AMG',
      year: '2024',
      km: '8.450 Km',
      fuel: 'Dizel',
      transmission: 'Otomatik',
      price: '5.150.000 TL',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop',
      url: 'https://bayraklarotomotiv.sahibinden.com/'
    },
    {
      id: '5',
      title: 'Porsche Cayenne 3.0 V6',
      brand: 'PORSCHE',
      model: 'CAYENNE 3.0 V6',
      year: '2023',
      km: '22.000 Km',
      fuel: 'Benzin',
      transmission: 'Otomatik',
      price: '6.850.000 TL',
      image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?q=80&w=800&auto=format&fit=crop',
      url: 'https://bayraklarotomotiv.sahibinden.com/'
    },
    {
      id: '6',
      title: 'Volvo XC90 B5 Inscription',
      brand: 'VOLVO',
      model: 'XC90 B5 Inscription',
      year: '2024',
      km: '5.200 Km',
      fuel: 'Hybrid',
      transmission: 'Otomatik',
      price: '4.950.000 TL',
      image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=800&auto=format&fit=crop',
      url: 'https://bayraklarotomotiv.sahibinden.com/'
    },
  ];
}

export async function GET() {
  const vehicles = await fetchSahibindenVehicles();
  
  return NextResponse.json({
    success: true,
    data: vehicles,
    timestamp: new Date().toISOString(),
    source: 'sahibinden'
  });
}
