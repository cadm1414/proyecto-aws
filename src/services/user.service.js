const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

class UserService {

    async getAllUsers() {
        try {
            return await userRepository.findAll();
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }


    async getActiveUsers() {
        try {
            return await userRepository.findActive();
        } catch (error) {
            throw new Error(`Error al obtener usuarios activos: ${error.message}`);
        }
    }


    async getUserById(id) {
        try {
            const user = await userRepository.findById(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }


    async createUser(userData) {
        try {
            // Validar que el email no exista
            const existingUser = await userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('El email ya está registrado');
            }


            const hashedPassword = await bcrypt.hash(userData.password, 10);


            const fullName = `${userData.name} ${userData.lastName}`;


            const newUserData = {
                email: userData.email,
                name: userData.name,
                lastName: userData.lastName,
                fullName: fullName,
                hashedPassword: hashedPassword,
                isActive: true
            };

            const newUser = await userRepository.create(newUserData);


            const userResponse = newUser.toJSON();
            delete userResponse.hashedPassword;

            return userResponse;
        } catch (error) {
            throw error;
        }
    }


    async updateUser(id, userData) {
        try {
            const user = await userRepository.findById(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }


            const updateData = { ...userData };
            if (userData.name || userData.lastName) {
                const name = userData.name || user.name;
                const lastName = userData.lastName || user.lastName;
                updateData.fullName = `${name} ${lastName}`;
            }


            if (userData.password) {
                updateData.hashedPassword = await bcrypt.hash(userData.password, 10);
                delete updateData.password;
            }

            const updatedUser = await userRepository.update(id, updateData);


            const userResponse = updatedUser.toJSON();
            delete userResponse.hashedPassword;

            return userResponse;
        } catch (error) {
            throw error;
        }
    }


    async deactivateUser(id) {
        try {
            const user = await userRepository.softDelete(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            return { message: 'Usuario desactivado exitosamente' };
        } catch (error) {
            throw error;
        }
    }


    async deleteUser(id) {
        try {
            const result = await userRepository.delete(id);
            if (!result) {
                throw new Error('Usuario no encontrado');
            }
            return { message: 'Usuario eliminado exitosamente' };
        } catch (error) {
            throw error;
        }
    }


    async verifyCredentials(email, password) {
        try {
            const user = await userRepository.findByEmail(email);
            if (!user) {
                throw new Error('Credenciales inválidas');
            }

            const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
            if (!isValidPassword) {
                throw new Error('Credenciales inválidas');
            }

            if (!user.isActive) {
                throw new Error('Usuario inactivo');
            }


            const userResponse = user.toJSON();
            delete userResponse.hashedPassword;

            return userResponse;
        } catch (error) {
            throw error;
        }
    }


    async countActiveUsers() {
        try {
            return await userRepository.countActive();
        } catch (error) {
            throw new Error(`Error al contar usuarios: ${error.message}`);
        }
    }
}

module.exports = new UserService();
