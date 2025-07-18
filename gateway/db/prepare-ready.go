package db

import (
	"context"
	"fmt"
	"os"

	"github.com/georgysavva/scany/v2/pgxscan"
	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/joho/godotenv/autoload"
)

var db, _ = pgxpool.New(context.Background(), os.Getenv("pgconnectionstring"))

func GetUser(userId int) (UserTable, error) {
	var user UserTable
	err := pgxscan.Get(context.Background(), db, &user, "SELECT * FROM users WHERE id=$1", userId)

	return user, err
}

func GetServerMembers(serverId int) ([]ServerMemberTable, error) {
	var members []ServerMemberTable
	err := pgxscan.Select(context.Background(), db, &members, "SELECT * FROM server_members WHERE server_id=$1", serverId)

	return members, err
}

func GetServerMembersForUser(userId int) ([]ServerMemberTable, error) {
	var members []ServerMemberTable
	err := pgxscan.Select(context.Background(), db, &members, "SELECT * FROM server_members WHERE user_id=$1", userId)

	return members, err
}

func GetServersByMembers(members []ServerMemberTable) ([]ServerTable, error) {
	var servers []ServerTable

	var serverIds []int
	for _, member := range members {
		serverIds = append(serverIds, member.ServerId)
	}
	fmt.Println(serverIds)

	if len(serverIds) == 0 {
		return servers, nil
	}

	err := pgxscan.Select(context.Background(), db, &servers, "SELECT * FROM servers WHERE id = ANY($1)", serverIds)

	return servers, err
}

func GetRoomsByServers(servers []ServerTable) ([]RoomTable, error) {
	var rooms []RoomTable

	var serverIds []int
	for _, server := range servers {
		serverIds = append(serverIds, server.Id)
	}

	if len(serverIds) == 0 {
		return rooms, nil
	}

	err := pgxscan.Select(context.Background(), db, &rooms, "SELECT * FROM rooms WHERE server_id = ANY($1)", serverIds)

	return rooms, err
}
