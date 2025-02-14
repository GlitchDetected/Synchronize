import { DataTypes, Model } from "sequelize";

import { sequelize } from "~/db";

class Messages extends Model {
    declare id: number;
    declare content: string | null;
    declare type: number;
    declare flags: number;
    declare room_id: number;
    declare author_id: number;
    declare attachment_ids: number[];
    declare edited_at: string | null;
    declare created_at: string;
}

Messages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        flags: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        room_id: {
            type: DataTypes.INTEGER,
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
        attachment_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        },
        edited_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: "Messages",
        tableName: "messages",
        timestamps: false
    }
);

export default Messages;