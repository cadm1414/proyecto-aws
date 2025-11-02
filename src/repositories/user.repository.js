const User = require('../models/User');

class UserRepository {

    async findAll() {
        return await User.findAll({
            attributes: { exclude: ['hashedPassword'] }
        });
    }


    async findById(id) {
        return await User.findByPk(id, {
            attributes: { exclude: ['hashedPassword'] }
        });
    }


    async findByEmail(email) {
        return await User.findOne({
            where: { email }
        });
    }


    async create(userData) {
        return await User.create(userData);
    }


    async update(id, userData) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        return await user.update(userData);
    }


    async softDelete(id) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        return await user.update({ isActive: false });
    }


    async delete(id) {
        const user = await User.findByPk(id);
        if (!user) {
            return null;
        }
        await user.destroy();
        return true;
    }


    async countActive() {
        return await User.count({
            where: { isActive: true }
        });
    }


    async findActive() {
        return await User.findAll({
            where: { isActive: true },
            attributes: { exclude: ['hashedPassword'] }
        });
    }
}

module.exports = new UserRepository();
