// Next.js API route for product search
// POST /api/search-products

export async function POST(request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return Response.json(
        { error: 'Query parameter is required and must be a non-empty string' }, 
        { status: 400 }
      );
    }

    // Here you would typically connect to your MongoDB products collection
    // For now, we'll create a realistic mock response based on the query
    
    const searchQuery = query.trim().toLowerCase();
    
    // Enhanced mock results that respond to the search query
    const mockResults = generateSearchResults(searchQuery);

    return Response.json({
      success: true,
      query: query.trim(),
      results: mockResults,
      total: mockResults.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Search API error:', error);
    return Response.json(
      { 
        error: 'Internal server error',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper function to generate realistic search results
function generateSearchResults(searchQuery) {
  const colors = ['red', 'blue', 'black', 'white', 'green', 'yellow', 'pink', 'purple', 'orange', 'gray'];
  const items = ['shirt', 't-shirt', 'jeans', 'dress', 'jacket', 'shoes', 'pants', 'skirt', 'sweater', 'hoodie'];
  const brands = ['Nike', 'Adidas', 'Zara', 'H&M', 'Uniqlo', 'Gap', 'Levi\'s', 'Calvin Klein', 'Tommy Hilfiger', 'Ralph Lauren'];
  
  // Determine if query matches specific colors or items
  const matchedColors = colors.filter(color => searchQuery.includes(color));
  const matchedItems = items.filter(item => searchQuery.includes(item));
  
  // Generate 8-15 results
  const resultCount = Math.floor(Math.random() * 8) + 8;
  
  return Array.from({ length: resultCount }, (_, index) => {
    // Use matched colors/items in results, or random ones
    const resultColor = matchedColors.length > 0 
      ? matchedColors[Math.floor(Math.random() * matchedColors.length)]
      : colors[Math.floor(Math.random() * colors.length)];
      
    const resultItem = matchedItems.length > 0
      ? matchedItems[Math.floor(Math.random() * matchedItems.length)]
      : items[Math.floor(Math.random() * items.length)];
    
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const basePrice = Math.floor(Math.random() * 150) + 25;
    const discount = Math.floor(Math.random() * 30) + 10;
    const originalPrice = Math.floor(basePrice * (100 + discount) / 100);
    
    return {
      id: `product_${index + 1}_${Date.now()}`,
      name: `${brand} ${resultColor.charAt(0).toUpperCase() + resultColor.slice(1)} ${resultItem.charAt(0).toUpperCase() + resultItem.slice(1)}`,
      title: `${brand} ${resultColor.charAt(0).toUpperCase() + resultColor.slice(1)} ${resultItem.charAt(0).toUpperCase() + resultItem.slice(1)}`,
      description: `Premium quality ${resultColor} ${resultItem} from ${brand}. Perfect for any occasion with modern fit and comfortable materials.`,
      price: basePrice,
      originalPrice: originalPrice,
      discount: `${discount}%`,
      image: `https://picsum.photos/300/400?random=${index + 100}`,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      reviews: Math.floor(Math.random() * 500) + 10,
      brand: brand,
      category: getCategoryFromItem(resultItem),
      availability: Math.random() > 0.15 ? 'In Stock' : 'Limited Stock',
      colors: generateColorVariants(resultColor),
      sizes: generateSizes(resultItem),
      tags: [resultColor, resultItem, brand.toLowerCase(), 'fashion', 'trending'],
      relevanceScore: calculateRelevanceScore(searchQuery, resultColor, resultItem, brand)
    };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore); // Sort by relevance
}

// Helper function to determine category
function getCategoryFromItem(item) {
  const categoryMap = {
    'shirt': 'Shirts',
    't-shirt': 'T-Shirts', 
    'jeans': 'Bottoms',
    'dress': 'Dresses',
    'jacket': 'Outerwear',
    'shoes': 'Footwear',
    'pants': 'Bottoms',
    'skirt': 'Bottoms',
    'sweater': 'Knitwear',
    'hoodie': 'Casual'
  };
  return categoryMap[item] || 'Fashion';
}

// Helper function to generate color variants
function generateColorVariants(primaryColor) {
  const allColors = ['Black', 'White', 'Blue', 'Red', 'Gray', 'Navy', 'Green', 'Brown', 'Pink', 'Purple'];
  const variants = [primaryColor.charAt(0).toUpperCase() + primaryColor.slice(1)];
  
  // Add 1-3 more color variants
  const additionalColors = allColors
    .filter(color => color.toLowerCase() !== primaryColor)
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);
    
  return [...variants, ...additionalColors];
}

// Helper function to generate sizes based on item type
function generateSizes(item) {
  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = ['7', '8', '9', '10', '11', '12'];
  const pantSizes = ['28', '30', '32', '34', '36', '38'];
  
  if (item === 'shoes') {
    return shoeSizes.slice(0, Math.floor(Math.random() * 4) + 3);
  } else if (item === 'jeans' || item === 'pants') {
    return pantSizes.slice(0, Math.floor(Math.random() * 4) + 3);
  } else {
    return clothingSizes.slice(0, Math.floor(Math.random() * 4) + 3);
  }
}

// Helper function to calculate relevance score
function calculateRelevanceScore(query, color, item, brand) {
  let score = 0;
  const queryLower = query.toLowerCase();
  
  // Exact matches get higher scores
  if (queryLower.includes(color)) score += 50;
  if (queryLower.includes(item)) score += 50;
  if (queryLower.includes(brand.toLowerCase())) score += 30;
  
  // Partial matches get lower scores
  if (color.includes(queryLower) || queryLower.includes(color.slice(0, 3))) score += 20;
  if (item.includes(queryLower) || queryLower.includes(item.slice(0, 3))) score += 20;
  
  // Add some randomness to prevent identical scores
  score += Math.random() * 10;
  
  return score;
}