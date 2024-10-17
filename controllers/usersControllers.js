import {
  selectUsers,
  deleteUser,
  updateUserDB,
  GetUserbyEmail,
  getEmailnotId,
} from "../database/usersDB.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await selectUsers();
    const response= result.recordset;
    res.json({ message: "Users Selected!", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error selecting users", error });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await deleteUser({ id });

    if (result.recordset) {
      res.json({ success: true});
    } else {
      res.json({ success: false});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {id, fName, lName, email, password, role } = req.body;
    const result = await updateUserDB({ id,fName, lName, email, password, role });
    res.json({ message: "User Updated!", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user!", error });
  }
};

export const getEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await GetUserbyEmail({ email });

    if (response && response.recordset && response.recordset.length > 0) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting email", error });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email,id } = req.body;
    const emailExists = await getEmailnotId({ email, id });

    res.json(emailExists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting email", error });
  }
};
