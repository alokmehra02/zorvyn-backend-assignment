export const authorize = (requiredPermissions) => {

  return (req, res, next) => {

    const userPermissions = req.user.permissions;

    const allowed = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!allowed) {

      return res.status(403).json({
        message: "Forbidden"
      });

    }

    next();

  };

};