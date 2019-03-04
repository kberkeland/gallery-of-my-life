# Gallery of My Life

This page is a collection of images that show important people or places in my life.

## Built With

This application uses React and a postgresql database.

## Getting Started

To get started with this project fork and clone the repository from GitHub.

### Prerequisites

The following programs need to be using npm install which means you should also have node package manager installed:

    "@material-ui/core": "^3.9.0",
    "@material-ui/icons": "^3.0.2",
    "axios": "^0.17.1",
    "material-design-icons": "^3.0.1",
    "pg": "^7.8.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-scripts": "^2.1.3",
    "sweetalert": "^2.1.2"


### Installing

Steps to get the development environment running.

1. Download this project.
2. `npm install`
3. `npm run server`
4. `npm run client`


### Completed Features

- Axios is used for `POST`, `GET`, `PUT` and `DELETE` requests to `gallery.router.js`.
- Material-ui has been used in the styling.
- At the bottom of the page is an input form for additional images to be added to the gallery.
- `AddGalleryItem.js` component is used for the input form.
- The picture no longer swaps the image to display a description. Instead it calls the `GalleryItemPopover.js` component.
- Current the number of likes per picture are shown with icons. Possibly annoying to read. Hovering over the picture will show text.

### Next Steps

- Adding a field to the database for year of the picture.
- Removing the input fields from the bottom of the page and adding a menu to select `Add a photo`.
- Clearing the input fields after data has been entered.
- Move more of `GalleryItem.js` into addtional components.

## Authors

* Kye Berkeland


## Acknowledgments

* The information at https://material-ui.com was very helpful in producing this application.
