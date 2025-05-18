
const {Schema}  = require('../models/Schema');

/**
 * @description to get all users
 * @param {*} req 
 * @param {*} res 
 * @returns to get all users from database
 */ 

exports.getallUsers = async (req, res) => {
    try {
        const allUsers = await Schema.find()
        res.status(200).json({
            status: 'success',
            results: allUsers.length,
            data: {
                users: allUsers
            }
        });
    } catch (error) {
        res.status(500).json({message : "data fetched failed"})
    }
}

/**
 * @description Create User (POST /api/users)
 * @param {*} req 
 * @param {*} res 
 * @returns to create a new user this code is determine
 */

exports.createUser = async (req, res) => {
    const body = req.body;
    try {
        const newUser = await Schema.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            ip_address: body.ip_address
        });
        return res.status(201).json({ satus: 'New user created', user: newUser })
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Failed to create user" });
    }
    
}

/**
 * @description Get User (GET /api/users/:id)
 * @param {*} req 
 * @param {*} res 
 * @returns single user with :id
 */

exports.getUser = async (req, res) => {
    try {
        const user = await Schema.findById(req.params.id);
        if (!user) { return res.status(404).json({ status: 'fail', message: 'User not found' }) };
        res.status(200).json({
            status: 'success',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch user'
        });
    }
};

/**
 * @description Delete User (DELETE /api/users/:id)
 * @param {*} req 
 * @param {*} res 
 * @return  to delete the user with /:id
 */  
exports.updateUser = async (req, res) => {
    try {
        const updateUser = await Schema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }  // return updated document
        );
        res.status(200).json({ status: 'success', data: updateUser });
    } catch (error) {
        res.status(500).json({status:'error', message: 'Failed to update user'})
    }
}

/**
 * @description to delete the user with the particulatr /:id
 * @param {*}eq 
 * @param {*} res 
 */
exports.deleteUser = async (req, res) => {
    try {
        await Schema.findByIdAndDelete(req.params.id);
        res.status(204).json({status:'success', message: "document is deleted success fully"}) // no-content
    }catch(error){res.status(500).json({status: "error", message:'failed to delete user'})}
}