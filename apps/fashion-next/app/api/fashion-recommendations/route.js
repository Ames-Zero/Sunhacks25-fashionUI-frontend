// Next.js API route for fashion recommendations
// POST /api/fashion-recommendations

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || !prompt.trim()) {
      return Response.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    console.log('Generating fashion recommendations for:', prompt);

    // Extract occasion and style preferences from prompt
    const occasion = extractOccasion(prompt);
    const style = extractStyle(prompt);
    const weather = extractWeather(prompt);
    const gender = extractGender(prompt);

    // Generate recommendations based on extracted information
    const recommendations = generateRecommendations(prompt, { occasion, style, weather, gender });

    const response = {
      prompt: prompt.trim(),
      occasion,
      style,
      weather,
      recommendations,
      timestamp: new Date().toISOString()
    };

    return Response.json(response, { status: 200 });

  } catch (error) {
    console.error('Fashion recommendations API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function extractOccasion(prompt) {
  const occasions = {
    'wedding': { emoji: '💒', name: 'Wedding' },
    'party': { emoji: '🎉', name: 'Party' },
    'work': { emoji: '💼', name: 'Work' },
    'job interview': { emoji: '💼', name: 'Job Interview' },
    'interview': { emoji: '💼', name: 'Interview' },
    'date': { emoji: '💕', name: 'Date' },
    'casual': { emoji: '👕', name: 'Casual' },
    'formal': { emoji: '🤵', name: 'Formal' },
    'beach': { emoji: '🏖️', name: 'Beach' },
    'vacation': { emoji: '🏖️', name: 'Vacation' },
    'gym': { emoji: '💪', name: 'Gym' },
    'workout': { emoji: '💪', name: 'Workout' },
    'dinner': { emoji: '🍽️', name: 'Dinner' },
    'lunch': { emoji: '🍽️', name: 'Lunch' },
    'meeting': { emoji: '💼', name: 'Meeting' },
    'conference': { emoji: '💼', name: 'Conference' },
    'graduation': { emoji: '🎓', name: 'Graduation' },
    'birthday': { emoji: '🎂', name: 'Birthday' }
  };
  
  const lowerPrompt = prompt.toLowerCase();
  for (const [key, value] of Object.entries(occasions)) {
    if (lowerPrompt.includes(key)) {
      return `${value.emoji} ${value.name}`;
    }
  }
  return '✨ Special Occasion';
}

function extractStyle(prompt) {
  const styles = ['elegant', 'casual', 'formal', 'trendy', 'classic', 'modern', 'vintage', 'minimalist', 'bohemian', 'edgy'];
  const lowerPrompt = prompt.toLowerCase();
  
  for (const style of styles) {
    if (lowerPrompt.includes(style)) {
      return style.charAt(0).toUpperCase() + style.slice(1);
    }
  }
  return 'Stylish';
}

function extractWeather(prompt) {
  const weatherKeywords = {
    'summer': 'Summer',
    'winter': 'Winter',
    'spring': 'Spring',
    'fall': 'Fall',
    'autumn': 'Autumn',
    'hot': 'Hot Weather',
    'cold': 'Cold Weather',
    'warm': 'Warm Weather',
    'cool': 'Cool Weather',
    'rainy': 'Rainy Weather',
    'sunny': 'Sunny Weather'
  };
  
  const lowerPrompt = prompt.toLowerCase();
  for (const [key, value] of Object.entries(weatherKeywords)) {
    if (lowerPrompt.includes(key)) {
      return value;
    }
  }
  return null;
}

function extractGender(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('dress') || lowerPrompt.includes('skirt') || lowerPrompt.includes('heels')) {
    return 'feminine';
  }
  if (lowerPrompt.includes('suit') || lowerPrompt.includes('tie') || lowerPrompt.includes('tuxedo')) {
    return 'masculine';
  }
  return 'neutral';
}

function generateRecommendations(prompt, context) {
  const { occasion, style, weather, gender } = context;
  
  // Base recommendations that can be customized
  const baseRecommendations = [
    {
      title: "Classic Elegant Choice",
      description: "Timeless and sophisticated option",
      confidence: 95,
      items: [],
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
      priceRange: "$$$"
    },
    {
      title: "Modern Trendy Look",
      description: "Contemporary and stylish approach",
      confidence: 85,
      items: [],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      priceRange: "$$"
    },
    {
      title: "Comfortable Yet Chic",
      description: "Perfect balance of comfort and style",
      confidence: 90,
      items: [],
      image: "https://images.unsplash.com/photo-1506629905607-d52b2fd5ad38?w=300&h=400&fit=crop",
      priceRange: "$$"
    }
  ];

  // Customize based on occasion
  if (occasion.includes('Wedding')) {
    baseRecommendations[0].items = ["Navy blue suit", "White dress shirt", "Silk tie", "Leather dress shoes", "Pocket square"];
    baseRecommendations[1].items = ["Charcoal blazer", "Light blue shirt", "Dark chinos", "Loafers", "Watch"];
    baseRecommendations[2].items = ["Light gray suit", "Pastel shirt", "Minimal accessories", "Comfortable dress shoes"];
  } else if (occasion.includes('Work') || occasion.includes('Interview')) {
    baseRecommendations[0].items = ["Black suit", "White shirt", "Conservative tie", "Black dress shoes", "Leather briefcase"];
    baseRecommendations[1].items = ["Gray blazer", "Button-down shirt", "Dress pants", "Oxford shoes", "Belt"];
    baseRecommendations[2].items = ["Smart casual blazer", "Polo shirt", "Chinos", "Loafers", "Minimal jewelry"];
  } else if (occasion.includes('Date')) {
    baseRecommendations[0].items = ["Dark jeans", "Nice button-up", "Casual blazer", "Clean sneakers", "Watch"];
    baseRecommendations[1].items = ["Chinos", "Henley shirt", "Cardigan", "Boat shoes", "Subtle cologne"];
    baseRecommendations[2].items = ["Smart casual outfit", "Fitted t-shirt", "Jacket", "Comfortable shoes"];
  } else if (occasion.includes('Beach') || occasion.includes('Vacation')) {
    baseRecommendations[0].items = ["Linen shirt", "Khaki shorts", "Sandals", "Sunglasses", "Sun hat"];
    baseRecommendations[1].items = ["Polo shirt", "Board shorts", "Flip-flops", "Beach bag", "Sunscreen"];
    baseRecommendations[2].items = ["T-shirt", "Swim shorts", "Water shoes", "Light jacket", "Waterproof watch"];
  } else {
    // Default casual recommendations
    baseRecommendations[0].items = ["Nice jeans", "Button-up shirt", "Casual blazer", "Sneakers", "Watch"];
    baseRecommendations[1].items = ["Chinos", "T-shirt", "Light jacket", "Casual shoes", "Sunglasses"];
    baseRecommendations[2].items = ["Comfortable pants", "Polo shirt", "Cardigan", "Loafers", "Belt"];
  }

  return baseRecommendations;
}

// Handle GET requests for documentation
export async function GET() {
  return Response.json({
    message: "Fashion Recommendations API",
    usage: "POST to this endpoint with a fashion prompt",
    example: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        prompt: "What should I wear to my best friend's wedding?"
      }
    },
    response_format: {
      prompt: "string",
      occasion: "string",
      style: "string", 
      weather: "string|null",
      recommendations: [
        {
          title: "string",
          description: "string",
          confidence: "number",
          items: ["array of strings"],
          image: "string (URL)",
          priceRange: "string"
        }
      ],
      timestamp: "string (ISO)"
    }
  });
}