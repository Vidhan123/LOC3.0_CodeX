const loggedin = (req) => {
    if (req.user) {
      return true;
    } else {
      throw new Error('Not authorized');
    }
  };
  
  const admin = (req) => {
    if (req.user && req.user.isAdmin) {
      return true;
    } else {
      throw new Error('Not authorized as an admin');
    }
  };
  
  module.exports =  { loggedin, admin };
  