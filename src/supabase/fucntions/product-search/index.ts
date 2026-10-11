const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();

    const query = String(
      body?.query ?? ""
    ).trim();

    console.log(
      "TEST FUNCTION RECEIVED:",
      query
    );

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Edge Function is working!",
        query,
        products: [
          {
            id: "test-1",
            name: "Test Perfume",
            brand: "Test Brand",
            image: "",
            price: 999,
            mrp: 1299,
            rating: 4.5,
            ratingCount: 100,
            available: true,
            platform: "Test Store",
            url: "",
          },
        ],
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "TEST FUNCTION ERROR:",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});