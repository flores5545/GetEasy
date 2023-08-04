const db = require('../model/index');

const getAllItems = async (req, res) => {
  try {
    const allItems = await db.item.findAll({
      // WHY WE NEED THESE?
      include: [
        db.address,
        db.offer
      ]
    });

    res.status = 200;
    res.send(allItems);
  } catch (error) {
    console.log('Failed ', error);
  }
}

const getOwnItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const allOwnItems = await db.user.findOne({
      where: {
        id: userId
      },

      // WHY DO WE NEED THESE?
        include: [
          {
            model: db.item,
            include: db.offer,
          },
          {
            model: db.item,
            include: db.address,
          }
        ]
        
    });

    res.status = 200;
    res.send(allOwnItems.items);
    
  } catch (error) {
    console.log('Failed ', error);
  }
}

// DOES NOT DO A SINGLE THING
const checkUser = async (req, res) => {
  const { id, email, name } = req.user;
  if (email) {
    res.status(200);
    res.send({ id, email, name });
  }
}



module.exports =  { getAllItems, getOwnItems, checkUser };