# PhotoCarousel

> Photo Carousel module of Guestly

## CRUD - API Documentation

### CRUD - initial listings

**USE** | **USE**: /photoCarousel/:listingID | Render carousel
**CREATE** | **POST**: /api/listings/phots/initial/:listingID | Create a new listing
**READ** | **GET** /api/listings/photos/initial/:listingID | Read all listings
**UPDATE** | **PUT**: /api/listings/photos/initial:listingID | Update an existing listing
**UPDATE** | **PATCH**: /api/listings/photos/initial:listingID | Update part of an existing listing

### CRUD  prior listings

**USE** | **USE**: /photoCarousel/:listingID | Render carousel
**CREATE** | **POST**: /api/listings/phots/:listingID | Create a new listing
**READ** | **GET** /api/listings/photos/:listingID | Read all listings
**UPDATE** | **PUT**: /api/listings/photos:listingID | Update an existing listing
**UPDATE** | **PATCH**: /api/listings/photos:listingID | Update part of an existing listing

## Related Projects

  - https://github.com/guest-ly/Reservations
  - https://github.com/guest-ly/Listing

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage
> Run webpack
```sh
npm run react-dev
```
> Run server on port 3002
```sh
npm start
```
> Seed database with random data using faker.js
```sh
npm run seed
```
> Run jest/enzyme tests
```sh
npm test
```

## Requirements

- Node 6.13.0
- Unsplash API key
```sh
Replace comment with your API key in unsplashHelper.js
```

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```
