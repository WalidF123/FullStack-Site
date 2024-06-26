const db = require('../database');
exports.all = async (req, res) => {
    const orderHistory = await db.orderHistory.findAll();
  
    res.json(orderHistory);
  };


  exports.byUser = async (req, res) => {
    try {
      const orderHistory = await db.orderHistory.findAll({ where: { userID: req.params.userID } });
      res.json(orderHistory);
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.error("ERROR FETCHING ORDERs");
    }
  };


 