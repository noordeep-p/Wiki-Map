# - Mapsy -
---
Mapsy is a a multi-page app that allows users to create and curate a list geographical data points.

## Contributors
---
[Noordeep Punjabi](https://github.com/noordeep-p)  | [Rhea Azarraga](https://github.com/Rheaazarraga)

## Demo
---

<p align="center">

![Mapsy in action](https://user-images.githubusercontent.com/84409001/139512622-062f7f19-9a7a-4405-b631-109ba48f89f9.mp4)

</p>


## Dependencies
---
* node: ^10.x,
* npm: ^5.x,
* body-parser: ^1.19.0,
* chalk: ^2.4.2,
* cookie-parser: ^1.4.5,
* cookie-session: ^1.4.0,
* dotenv: ^2.0.0,
* ejs: ^2.6.2,
* express: ^4.17.1,
* pg: ^8.5.0,
* pg-native: ^3.0.0,
* request: ^2.88.2,
* sass: ^1.35.1
## Dev Dependencies
---
* nodemon: ^2.0.10
* morgan: ^1.9.1

***This app requires Google Maps and Places API keys. The current keys in the project are restricted and will not work on other hosts.***

---

## Getting Started
---

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
