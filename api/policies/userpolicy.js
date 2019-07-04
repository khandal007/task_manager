module.exports = async function (req, res, proceed) {
  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  console.log("hello him");

  if (req.session.userId == null) {
  	console.log("himanshu")
    return res.redirect('/login');
  }
  

   return proceed();
};