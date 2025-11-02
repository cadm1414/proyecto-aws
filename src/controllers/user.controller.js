const userService = require('../services/user.service');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
};

const getActiveUsers = async (req, res) => {
  try {
    const users = await userService.getActiveUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios activos',
      error: error.message
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    const statusCode = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};


const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nombre, apellido, email y password son requeridos'
      });
    }

    const newUser = await userService.createUser({
      name,
      lastName,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUser
    });
  } catch (error) {
    const statusCode = error.message === 'El email ya está registrado' ? 400 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body;

    const updatedUser = await userService.updateUser(id, {
      name,
      lastName,
      email,
      password
    });

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    const statusCode = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};


const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deactivateUser(id);

    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    const statusCode = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);

    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    const statusCode = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y password son requeridos'
      });
    }

    const user = await userService.verifyCredentials(email, password);

    res.json({
      success: true,
      message: 'Login exitoso',
      data: user
    });
  } catch (error) {
    const statusCode = error.message.includes('Credenciales') || error.message.includes('inactivo') ? 401 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getActiveUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
  deleteUser,
  loginUser
};
