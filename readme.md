<a id="readme-top"></a>

## Synchronize
> Next generation of connection

`This is a hobby project`
---

Core Philosophy
| Path                    | Description        |
| ----------------------- | ------------------ |
| `./gateway`             | Websocket server to handle cache updates for the client |
| `./web`                 | The frontend of chat app, react router + tailwind |

  <a href="https://github.com/GlitchDetected/Synchronize">
    <img src="images/synclogo.png" alt="Logo" width="1000" height="200">
  </a>

---

**Fill in the environment variables before running gateway and web. All data is stored in a Postgresql database and synchronised w/ `./gateway`.**

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#Synchronize">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <a href="#deploy">Deploy</a>
      <a href="#updating">Updating</a>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Built With

* [![Rust][Rust]][Rust-url]
* [![Go][Go]][Go-url]
* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## setup
For the setup, you can run `make` to automate (faster approach) or manually run the commands below

** using make **
`makefile`
- make gateway
- make web

** manually do it **
`./gateway`
- create a .env file in `./gateway`
```env
SECRET="somerandomsecret12345"
REDIS_ADDR="redishost:6379"
REDIS_PASSWORD="redispassword"
pgconnectionstring="postgresql://postgres:passwordforyourdb@yourhost:5432/databasename"
```
- install go @ https://go.dev/doc/install
- go run main.go

`./web`
- install nodejs @ https://nodejs.org/en/download
- create a .env file in `./web`
```env
SECRET="somerandomsecret12345"
RESEND_API_SECRET="resendapisecretkeyhere"
pgconnectionstring="postgresql://postgres:passwordforyourdb@yourhost:5432/databasename"
CAPTCHA_SECRET="somesecretkey" 
# get captcha secret at https://www.cloudflare.com/application-services/products/turnstile/
redispgconnectionstring="redis://redisusername:thepassword@yourredishost:50952"
```
- make sure that you have pnpm installed already, if not, use `npm i -g pnpm`
- install deps using `pnpm install`
- run in development mode using `pnpm dev` or if you want to deploy it use `pnpm build` then `pnpm start`
- runs on http://localhost:5173/login in `development` and http://localhost:3010/login in `production`

See the [open issues](https://github.com/GlitchDetected/Synchronize/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Deploy

To build and run

`./web`
```
cd web
pnpm build
pnpm start
```
`./gateway`
```
cd gateway
go run main.go
```

or if you prefer Docker
```
cd web
docker build -t synchronize-web .
docker compose up -d
```
```
cd gateway
docker build -t synchronize-gateway .
docker compose up -d
```

## Updating
```
docker compose down
sudo git pull

docker build -t synchronize-web .
docker compose up -d

# or

docker build -t synchronize-gateway .
docker compose up -d
```

## Contributing

Contributions is what makes the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**!

To contribute, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/GlitchDetected/Synchronize/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=GlitchDetected/Synchronize" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Resources
- https://www.postgresql.org/download/macosx/
- https://postgresapp.com/
- https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/
- https://nodejs.org/en/download

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/GlitchDetected/Synchronize.svg?style=for-the-badge
[contributors-url]: https://github.com/GlitchDetected/Synchronize/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/GlitchDetected/Synchronize.svg?style=for-the-badge
[forks-url]: https://github.com/GlitchDetected/Synchronize/network/members
[stars-shield]: https://img.shields.io/github/stars/GlitchDetected/Synchronize.svg?style=for-the-badge
[stars-url]: https://github.com/GlitchDetected/Synchronize/stargazers
[issues-shield]: https://img.shields.io/github/issues/GlitchDetected/Synchronize.svg?style=for-the-badge
[issues-url]: https://github.com/GlitchDetected/Synchronize/issues
[license-shield]: https://img.shields.io/github/license/GlitchDetected/Synchronize.svg?style=for-the-badge
[license-url]: https://github.com/GlitchDetected/Synchronize/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Go]: https://img.shields.io/badge/Go-20232A?style=for-the-badge&logo=go&logoColor=61DAFB
[Go-url]: https://go.dev/
[Rust]: https://img.shields.io/badge/rust-20232A?style=for-the-badge&logo=rust&logoColor=FFA500
[Rust-url]: https://www.rust-lang.org/