import { Model } from 'sequelize';
import { hash, compare } from 'bcryptjs';
import sequelize from '../config/database.js'; // You'll need to create this

class User extends Model {
    // Instance method for password comparison
    async comparePassword(plainPassword) {
        return compare(plainPassword, this.password);
    }
}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    hooks: {
        // Hook to hash password before saving
        beforeSave: async (user) => {
            if (user.changed('password')) {
                user.password = await hash(user.password, 10);
            }
        }
    }
});

export default User;