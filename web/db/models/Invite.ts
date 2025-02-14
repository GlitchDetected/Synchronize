import { DataTypes, Model } from "sequelize";

import { sequelize } from "~/db";

class Invite extends Model {
    declare code: string;
    declare server_id: number;
    declare room_id: number;
    declare author_id: number;
    declare expires_at: string | null;
    declare created_at: string;
}

Invite.init(
    {
        code: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        server_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "servers",
                key: "id"
            }
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "rooms",
                key: "id"
            }
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "users",
                key: "id"
            }
        },
        expires_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "Invite",
        tableName: "invites",
        timestamps: false
    }
);

export default Invite;