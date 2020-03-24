exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    page_title: 'Page Not Found',
    path: '/404',
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: "Something Went Wrong!"
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render('500', {
    page_title: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
    errorMessage: "Page Not Found!"
  });
};
