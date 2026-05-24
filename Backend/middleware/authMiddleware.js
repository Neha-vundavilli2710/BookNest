import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  try {

    // GET AUTH HEADER

    const authHeader =
      req.header("Authorization");

    // CHECK HEADER

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided",
      });

    }

    // EXTRACT TOKEN

    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    // VERIFY TOKEN

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // STORE USER DATA

    req.user = verified;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });

  }

};

export default authMiddleware;