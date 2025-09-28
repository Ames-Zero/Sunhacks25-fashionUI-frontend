// Next.js API route for adding products to closet/wardrobe
// POST /api/add-to-closet

export async function POST(request) {
  try {
    // Handle both JSON and form-encoded requests
    let productId;
    const contentType = request.headers.get('content-type');
    
    if (contentType?.includes('application/x-www-form-urlencoded')) {
      // Handle form-encoded data (as specified in curl command)
      const formData = await request.formData();
      productId = formData.get('product_id');
    } else if (contentType?.includes('application/json')) {
      // Handle JSON data
      const body = await request.json();
      productId = body.product_id || body.productId;
    } else {
      return Response.json(
        { error: 'Content-Type must be application/x-www-form-urlencoded or application/json' },
        { status: 400 }
      );
    }

    // Validate product_id
    if (!productId) {
      return Response.json(
        { 
          error: 'Missing required parameter: product_id',
          message: 'Please provide a valid product_id'
        },
        { status: 400 }
      );
    }

    // Validate product_id format (should be a valid identifier)
    if (typeof productId !== 'string' && typeof productId !== 'number') {
      return Response.json(
        { 
          error: 'Invalid product_id format',
          message: 'product_id must be a string or number'
        },
        { status: 400 }
      );
    }

    console.log(`Adding product ${productId} to closet`);

    // Here you would typically:
    // 1. Validate that the product exists (fetch from database/API)
    // 2. Check if user is authenticated (if required)
    // 3. Add the product to user's closet/wardrobe in database
    // 4. Handle duplicate entries (already in closet)

    // For now, we'll simulate the process with a mock response
    // In a real implementation, you might:
    /*
    try {
      // Check if product exists
      const product = await getProductById(productId);
      if (!product) {
        return Response.json(
          { error: 'Product not found', productId },
          { status: 404 }
        );
      }

      // Check if already in closet (optional)
      const existsInCloset = await checkProductInCloset(userId, productId);
      if (existsInCloset) {
        return Response.json(
          { 
            message: 'Product already in closet',
            productId,
            status: 'already_exists'
          },
          { status: 200 }
        );
      }

      // Add to closet
      const result = await addProductToCloset(userId, productId);
      
      return Response.json({
        message: 'Product successfully added to closet',
        productId,
        status: 'added',
        timestamp: new Date().toISOString(),
        closetItem: result
      });
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      return Response.json(
        { error: 'Failed to add product to closet' },
        { status: 500 }
      );
    }
    */

    // Mock successful response
    const response = {
      message: 'Product successfully added to closet',
      productId: productId,
      status: 'added',
      timestamp: new Date().toISOString(),
      closetItem: {
        id: productId,
        addedAt: new Date().toISOString(),
        userId: 'mock_user_123', // In real app, get from authentication
      }
    };

    return Response.json(response, { status: 201 });

  } catch (error) {
    console.error('Add to closet API error:', error);
    
    return Response.json(
      { 
        error: 'Internal server error',
        message: 'Failed to process add-to-closet request'
      },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests for testing
export async function GET(request) {
  return Response.json(
    {
      message: 'Add to Closet API',
      usage: 'POST to this endpoint with product_id',
      example: {
        curl: 'curl -X POST "http://localhost:3000/api/add-to-closet" -H "Content-Type: application/x-www-form-urlencoded" -d "product_id=123"',
        json: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: { product_id: '123' }
        }
      }
    },
    { status: 200 }
  );
}

// Handle unsupported methods
export async function PUT() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}