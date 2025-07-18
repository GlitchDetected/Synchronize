import { DataTypes, Model } from "sequelize";

import { sequelize } from "~/db";

class User extends Model {
    declare id: number;
    declare email: string;
    declare password_hash: string;
    declare username: string;
    declare nickname: string;
    declare flags: number;
    declare avatar_id: number;
    declare banner_id: number;
    declare aboutme: string | null;
    declare pronouns: string | null;
    declare apptheme: string | null;

    declare readonly created_at: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        flags: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        avatar_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        banner_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        aboutme: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pronouns: {
            type: DataTypes.STRING,
            allowNull: true
        },
        apptheme: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "dark"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "users",
        tableName: "users",
        timestamps: false
    }
);

export default User;