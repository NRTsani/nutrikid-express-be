# Nutrikid Backend

Nutrikid is a web application platform designed to provide information and education about nutrition, specifically targeted toward pregnant and breastfeeding mothers, children, infants, and toddlers. The application aims to support parents, caregivers, and the broader Indonesian community in meeting the nutritional needs of their children to prevent and reduce stunting. It also seeks to promote a deeper understanding of the importance of proper nutrition during pregnancy and early childhood development.

## Features

- **User Registration and Login**: Users can create an account and log in to access the full features of the platform.

- **Article Access**: Users can browse and search for articles related to nutrition and parenting, and read them directly through the website.

- **Online Consultation**: After making a payment, users can consult with doctors via chat or call, helping them get expert advice tailored to their needs.

- **Educational Programs**: Users can join both free and paid programs, which include modules and lessons designed to enhance their understanding of nutrition and parenting.

- **Events Participation**: Logged-in users can register for online events, which are conducted through Zoom and often include interactive sessions.

- **Doctor Directory**: The platform enables users to find and connect with professional doctors specializing in nutrition and child development.

## Tech Stack

- **Frontend**: React Vite, Bootstrap
- **Backend**: MongoDB, Express js, Node js

## Installation and Setup Instructions

### Prequisites

1. Git
2. Node.js
3. NPM
4. MongoDB

### Cloning this repo

```bash
> git clone https://github.com/NRTsani/nutrikid-express-be.git
> cd nutrikid-express-be
```

### Installing the dependencies

```bash
> npm install
```

### Setup Environment

Setup your `.env` file in the root of your project and add the following content:

```bash
PORT= 3001
NODE_ENV='localhost'
MONGODB_CONNECTION_STRING=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET_KEY=
```

### Running App

```bash
> npm run dev
```

The application will be run at: `http://localhost:3001`

## Live Demo App

[Click here](https://nutrikid-v1.netlify.app/) to visit the live site and test out the features yourself.

## API Documentation

For detailed API endpoints and usage, refer to the Postman documentation [Click Here](https://documenter.getpostman.com/view/13684114/2s9YeHbBf5)

## Frontend Repository

To access frontend repository of the web application, [click here](https://github.com/petrabayu/nutrikid-react-fullstack.git).

## Author

### By Kelompok 3 - Youth Digital Acceleration Skilvul x YCAB

- [Naufal Rafi Tsani P A](https://github.com/NRTsani)
- [Nurul Husna](https://github.com/hushus23)
- [Petra Bayu Pangestu](https://github.com/petrabayu)
