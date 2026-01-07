import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import ApiResponse from "@/utils/apiResponse";

const AddToCart = Joi.object({
  userID: Joi.string().required(),
  productID: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const authResult = await AuthUser(req);

    // Check authentication
    if (!authResult.success) {
      const { error, message } = authResult;
      
      if (error === "TOKEN_EXPIRED") {
        return ApiResponse.tokenExpired(message);
      } else if (error === "MISSING_TOKEN" || error === "INVALID_TOKEN") {
        return ApiResponse.unauthorized(message);
      }
      
      return ApiResponse.unauthorized(message);
    }

    const data = await req.json();
    const { productID, userID } = data;

    // Validate input
    const { error } = AddToCart.validate({ userID, productID });

    if (error) {
      return ApiResponse.validationError(error.details[0].message);
    }

    console.log("📦 Adding to cart - Product:", productID, "User:", userID);

    // Check if product already in cart
    const isCurrentCartItemAlreadyExists = await Cart.find({
      productID: productID,
      userID: userID,
    });

    if (isCurrentCartItemAlreadyExists?.length > 0) {
      return ApiResponse.conflict(
        "This product is already in your cart. Please increase the quantity instead."
      );
    }

    // Add to cart
    const saveProductToCart = await Cart.create(data);

    if (saveProductToCart) {
      console.log("✅ Product added to cart successfully");
      return ApiResponse.success(
        saveProductToCart,
        "Product added to cart successfully!",
        201
      );
    } else {
      return ApiResponse.error(
        "Failed to add product to cart. Please try again.",
        400,
        "ADD_TO_CART_FAILED"
      );
    }
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    
    // Handle specific error types
    if (error.name === "ValidationError") {
      return ApiResponse.validationError(
        "Invalid data provided. Please check your input."
      );
    }
    
    if (error.name === "CastError") {
      return ApiResponse.validationError(
        "Invalid ID format provided."
      );
    }

    return ApiResponse.serverError(
      "Something went wrong while adding to cart. Please try again later."
    );
  }
}
