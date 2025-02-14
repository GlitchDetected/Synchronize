import { DataTypes, Model } from "sequelize";

import { sequelize } from "~/db";

class ServerMembers extends Model {
    declare server_id: number;
    declare user_id: number;
    declare readonly joined_at: Date;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

ServerMembers.init(
    {
        server_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "servers",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: "CASCADE"
        },
        joined_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "ServerMembers",
        tableName: "server_members",
        timestamps: false
    }
);

export default ServerMembers;