import { DataTypes, Model } from "sequelize";

import { sequelize } from "~/db";

// Define Room model attributes
const RoomAttributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER, // RoomType enum stored as an integer
        allowNull: false,
        defaultValue: 0 // Default to ServerText if not provided
    },
    flags: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Default value for flags
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Default position
    },
    server_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "servers",
            key: "id"
        }
    },
    parent_room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "rooms",
            key: "id"
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }
};

// Room Model
class Room extends Model {
    declare id: number;
    declare name: string;
    declare type: number;
    declare flags: number;
    declare position: number;
    declare server_id: number;
    declare parent_room_id: number | null;
    declare readonly created_at: Date;
}

Room.init(RoomAttributes, {
    sequelize,
    modelName: "Rooms",
    tableName: "rooms",
    timestamps: false
});

export default Room;