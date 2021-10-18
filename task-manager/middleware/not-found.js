exports.notFound = (req, res) => {
    res.status(404).json({
        code: 404,
        status: "failure",
        message: "Route not found",
      });
}