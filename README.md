you need to install docker to run this project

open Netflix directory and run docker-compose up

you can open the website in 2 ways https://192.168.1.213:3000/ or https://localhost:3000/
the only difference is that google authentication works only via https://localhost:3000/ URL because Google API doesn't support local ip addresses
and login by QR code is available only via https://192.168.1.213:3000/ URL because in this case 2 devices must contact to each other
