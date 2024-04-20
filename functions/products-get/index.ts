import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { getProducts } from "../lib/products";
import { serverErrorResponse } from "../lib/responses";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    const products = await getProducts();

    context.res = {
      status: 200,
      body: {
        success: true,
        message: "Products fetched successfully.",
        data: products,
      },
    };
  } catch (error) {
    serverErrorResponse("Error fetching products.");
    return;
  }
};

export default httpTrigger;
