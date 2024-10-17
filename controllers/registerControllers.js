import { registerAuthor } from '../database/registerDB.js';

export const registerAut = async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body;
        const result = await registerAuthor({ fName, lName, email, password });
        res.json({ message: "Author inserted!", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error inserting author", error });
    }
};

