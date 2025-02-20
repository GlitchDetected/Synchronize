FROM golang:latest
WORKDIR /app

COPY go.mod go.sum ./

COPY . .

EXPOSE 8080

CMD ["go", "run", "main.go"]