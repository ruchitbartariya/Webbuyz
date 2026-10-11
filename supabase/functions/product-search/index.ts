const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

function jsonResponse(
  body: unknown,
  status = 200
) {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type":
          "application/json",
      },
    }
  );
}

function normalizeProduct(
  product: any,
  platform: string
) {
  const price = Number(
    product.offer_price ??
      product.price ??
      0
  );

  const mrp = Number(
    product.mrp ?? 0
  );

  const image =
    product.images?.[0] ??
    product.image ??
    "";

  const url =
    product.deeplink ??
    product.product_url ??
    product.url ??
    "";

  return {
    id: `${platform}-${product.id ?? Math.random()}`,
    externalId: String(
      product.id ?? ""
    ),

    name:
      product.name ??
      "Unknown Product",

    brand:
      product.brand ?? "",

    image,

    images:
      product.images ?? [],

    price,

    mrp,

    rating:
      product.rating != null
        ? Number(product.rating)
        : null,

    ratingCount: Number(
      product.rating_count ??
        product.ratingCount ??
        0
    ),

    available:
      product.available ??
      product.in_stock ??
      true,

    quantity:
      product.quantity ??
      product.weight ??
      "",

    platform,

    url,

    inventory:
      product.inventory ?? null,
  };
}

function extractProducts(
  apiData: any
) {
  const products: any[] = [];

  const grouped =
    apiData?.data?.results;

  if (
    grouped &&
    typeof grouped === "object"
  ) {
    for (
      const [
        platform,
        platformProducts,
      ] of Object.entries(grouped)
    ) {
      if (
        !Array.isArray(
          platformProducts
        )
      ) {
        continue;
      }

      for (
        const product of platformProducts
      ) {
        products.push(
          normalizeProduct(
            product,
            platform
          )
        );
      }
    }
  }

  if (
    products.length === 0 &&
    Array.isArray(
      apiData?.data?.products
    )
  ) {
    for (
      const product of
        apiData.data.products
    ) {
      products.push(
        normalizeProduct(
          product,
          product.platform?.name ??
            product.platform ??
            "Unknown"
        )
      );
    }
  }

  return products;
}

function removeDuplicates(
  products: any[]
) {
  const map = new Map<
    string,
    any
  >();

  for (const product of products) {
    const key =
      `${product.platform}-${product.externalId}`;

    if (
      product.externalId &&
      map.has(key)
    ) {
      continue;
    }

    map.set(key, product);
  }

  return Array.from(
    map.values()
  );
}

Deno.serve(async (req) => {
  /*
   * IMPORTANT:
   * Handle CORS preflight BEFORE
   * doing anything else.
   */
  if (req.method === "OPTIONS") {
    return new Response(
      "ok",
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "text/plain",
        },
      }
    );
  }

  if (req.method !== "POST") {
    return jsonResponse(
      {
        success: false,
        message:
          "Only POST requests are allowed.",
      },
      405
    );
  }

  try {
    const body =
      await req.json();

    const query = String(
      body?.query ?? ""
    ).trim();

    if (!query) {
      return jsonResponse(
        {
          success: false,
          message:
            "Search query is required.",
        },
        400
      );
    }

    const apiKey =
      Deno.env.get(
        "QUICKCOMMERCE_API_KEY"
      );

    if (!apiKey) {
      console.error(
        "QUICKCOMMERCE_API_KEY is missing"
      );

      return jsonResponse(
        {
          success: false,
          message:
            "QUICKCOMMERCE_API_KEY is missing from Supabase Edge Function secrets.",
        },
        500
      );
    }

    const platforms = [
      "Amazon",
      "Flipkart",
      "Myntra",
      "Nykaa",
    ];

    /*
     * Default location.
     * We are not asking browser for
     * precise location.
     */
    const lat = Number(
      body?.lat ?? 28.9845
    );

    const lon = Number(
      body?.lon ?? 77.7064
    );

    const params =
      new URLSearchParams();

    params.set("q", query);

    params.set(
      "lat",
      String(lat)
    );

    params.set(
      "lon",
      String(lon)
    );

    params.set(
      "platforms",
      platforms.join(",")
    );

    const apiUrl =
      `https://api.quickcommerceapi.com/v1/groupsearch?${params.toString()}`;

    console.log(
      "QuickCommerce request:",
      apiUrl
    );

    const apiResponse =
      await fetch(apiUrl, {
        method: "GET",

        headers: {
          "X-API-Key":
            apiKey,

          Accept:
            "application/json",
        },
      });

    const apiText =
      await apiResponse.text();

    let apiData: any;

    try {
      apiData =
        JSON.parse(apiText);
    } catch {
      apiData = {
        raw: apiText,
      };
    }

    console.log(
      "QuickCommerce status:",
      apiResponse.status
    );

    console.log(
      "QuickCommerce response:",
      JSON.stringify(
        apiData
      )
    );

    if (!apiResponse.ok) {
      return jsonResponse(
        {
          success: false,

          message:
            apiData?.message ??
            apiData?.error ??
            "QuickCommerce API returned an error.",

          apiStatus:
            apiResponse.status,

          details:
            apiData,
        },

        apiResponse.status
      );
    }

    let products =
      extractProducts(
        apiData
      );

    products =
      removeDuplicates(
        products
      );

    products =
      products.filter(
        (product) =>
          Number(
            product.price
          ) > 0
      );

    products.sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );

    products =
      products.slice(
        0,
        100
      );

    return jsonResponse({
      success: true,

      query,

      products,

      totalResults:
        products.length,

      platforms,

      creditsRemaining:
        apiData?.credits_remaining ??
        null,

      requestId:
        apiData?.request_id ??
        null,

      rawStatus:
        apiData?.status ??
        null,
    });
  } catch (error) {
    console.error(
      "PRODUCT SEARCH ERROR:",
      error
    );

    return jsonResponse(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unknown error occurred.",
      },

      500
    );
  }
});