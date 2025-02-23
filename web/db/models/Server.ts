import { DataTypes, Model } from "sequelize";

import { sequelize } from "~/db";

class Server extends Model {
    declare id: number;
    declare name: string;
    declare flags: number;
    declare owner_id: number;
    declare icon_id: number | null;
    declare banner_id: number | null;
    declare readonly created_at: Date;
}

Server.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flags: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        icon_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        banner_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "Server",
        tableName: "servers",
        timestamps: false
    }
);

export default Server;