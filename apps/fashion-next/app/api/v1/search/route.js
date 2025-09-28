// Next.js API route for search
// This would typically connect to your backend API or database

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return Response.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Here you would typically:
    // 1. Connect to your database or external API
    // 2. Perform the search based on the query
    // 3. Return the results
    
    // For now, return a mock response
    const mockResults = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      title: `${query} - Product ${index + 1}`,
      description: `High-quality ${query.toLowerCase()} with premium materials.`,
      price: Math.floor(Math.random() * 200) + 20,
      originalPrice: Math.floor(Math.random() * 300) + 100,
      image: `https://picsum.photos/300/400?random=${index + 1}`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 500) + 10,
      brand: ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo'][Math.floor(Math.random() * 5)],
      category: 'Fashion',
      availability: Math.random() > 0.2 ? 'In Stock' : 'Limited Stock',
      colors: ['Black', 'White', 'Blue', 'Red', 'Gray'].slice(0, Math.floor(Math.random() * 3) + 1),
      sizes: ['S', 'M', 'L', 'XL'].slice(0, Math.floor(Math.random() * 4) + 1),
    }));

    return Response.json(mockResults);
  } catch (error) {
    console.error('Search API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}