const adminMiddleware = (
  req,
  res,
  next
) => {

  try {

    // CHECK ADMIN

    if (!req.user.isAdmin) {

      return res.status(403).json({

        success: false,

        message:
          "Access Denied. Admin Only",

      });

    }

    next();

  } catch (error) {

    return res.status(500).json({

      success: false,

      message:
        "Admin Authorization Failed",

    });

  }

};

export default adminMiddleware;