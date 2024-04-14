import usermodel from "../models/User.js";

const create = async (req, res) => {
  try {
    const { count, firstname, bankname, money, date } = req.body;
    const Newuser = new usermodel({
      count,
      firstname,
      bankname,
      money,
      date,
    });

    // Calcul et sauvegarde du pay
    Newuser.pay = parseFloat(money) * (1 + Newuser.rate / 100);
    await Newuser.save();

    res
      .status(200)
      .json({ success: true, message: "User Created Successfully.", Newuser });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

///////Read api
const get = async (req, res) => {
  try {
    const users = await usermodel.find();
    if (!users) {
      return res.status(404).json({ success: false });
    }

    // Calcul du total, minimum et maximum des montants
    const totalpay = users.reduce(
      (acc, user) => acc + parseFloat(user.money),
      0
    );

    const minpay = Math.min(...users.map((user) => user.money));
    const maxpay = Math.max(...users.map((user) => user.money));

    res.status(200).json({ users, totalpay, minpay, maxpay });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

////////update user api
const Updated = async (req, res) => {
  try {
    const userId = req.params.id;

    const updateData = req.body; // Récupération des données envoyées dans la requête

    const updateuser = await usermodel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updateuser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      updateuser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// delet user ap
const Delete = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletuser = await usermodel.findByIdAndDelete(userId);
    if (!deletuser) {
      return res
        .status(404)
        .json({ success: false, message: "user Not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "user Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { create, get, Updated, Delete };
