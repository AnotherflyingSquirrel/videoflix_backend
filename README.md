<p align="center"><h1 align="center">VIDEOFLIX_BACKEND</h1></p>

<p align="center">Built with the tools and technologies:</p>
<p align="center">
	<img src="https://img.shields.io/badge/Node%20js-339933?style=flat&logo=nodedotjs&logoColor=white" alt="Cloudinary">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&logo=Mongoose&logoColor=white" alt="Mongoose">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/Cloudinary-3448C5.svg?style=flat&logo=Cloudinary&logoColor=white" alt="Cloudinary">
</p>
<br>

## Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
  - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Testing](#-testing)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

## Overview

VIDEOFLIX is an online video streaming platform built using Javascript in the nodeJS runtime Environment.
VIDEOFLIX uses ExpressJS to serve HTTP requests from a frontend server at an exposed API endpoint.
Images and videos are fetched from a cloudinary database. User data, likes, comments, user watch history,subscriptions and playlist data is fetched from a mongoDB database using mongoose.
This repository is the codebase for the backend server for VIDEOFLIX.

---

## Features

- Healthcheck routes
- Secure user login, logout and registration
- Access and Refresh tokens to validate client sessions
- User profile and passwordUpdation
- User cover and avatar image updation
- View users' channel 
- Watch history exploration
- Extensive Error handling
- Like functionality for comments and videos

---

## Project Structure

```sh
└── videoflix_backend/
    ├── package-lock.json
    ├── package.json
    └── src
        ├── README.md
        ├── app.js
        ├── constants.js
        ├── controllers
        │   ├── healthcheck.controllers.js
        │   ├── like.controllers.js
        │   └── user.controllers.js
        ├── db
        │   └── index.js
        ├── index.js
        ├── middlewares
        │   ├── auth.middlewares.js
        │   ├── error.middlewares.js
        │   └── multer.middlewares.js
        ├── models
        │   ├── comment.models.js
        │   ├── like.models.js
        │   ├── playlist.models.js
        │   ├── subscription.models.js
        │   ├── tweet.models.js
        │   ├── user.models.js
        │   └── video.models.js
        ├── routes
        │   ├── healthcheck.routes.js
        │   └── user.routes.js
        └── utils
            ├── apiError.js
            ├── apiResponse.js
            ├── asyncHandler.js
            └── cloudinary.js
```

### Project Index

<details open>
	<summary><b><code>VIDEOFLIX_BACKEND/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/app.js'>app.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/index.js'>index.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/constants.js'>constants.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>middlewares</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/middlewares/multer.middlewares.js'>multer.middlewares.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/middlewares/auth.middlewares.js'>auth.middlewares.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/middlewares/error.middlewares.js'>error.middlewares.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>controllers</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/controllers/like.controllers.js'>like.controllers.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/controllers/healthcheck.controllers.js'>healthcheck.controllers.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/controllers/user.controllers.js'>user.controllers.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>models</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/playlist.models.js'>playlist.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/comment.models.js'>comment.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/tweet.models.js'>tweet.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/subscription.models.js'>subscription.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/like.models.js'>like.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/video.models.js'>video.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/models/user.models.js'>user.models.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>routes</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/routes/user.routes.js'>user.routes.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/routes/healthcheck.routes.js'>healthcheck.routes.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>utils</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/utils/apiError.js'>apiError.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/utils/apiResponse.js'>apiResponse.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/utils/cloudinary.js'>cloudinary.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/utils/asyncHandler.js'>asyncHandler.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>db</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/master/src/db/index.js'>index.js</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

Before getting started with videoflix_backend, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

### Installation

Install videoflix_backend using one of the following methods:

**Build from source:**

1. Clone the videoflix_backend repository:

```sh
❯ git clone https://github.com/AnotherflyingSquirrel/videoflix_backend
```

2. Navigate to the project directory:

```sh
❯ cd videoflix_backend
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

## Setup environment variables

```sh
❯ touch ./.env
```

### Inject required environment variables

- PORT : exposed port number
- CORS_ORIGIN : add frontend url to only allow requests from this url to be entertained
- MONGODB_URI : Connection string for mongoDB cluster
- CLOUDINARY_CLOUD_NAME : cloudinary cloud database name
- CLOUDINARY_API_KEY : cloudinary api key
- CLOUDINARY_API_SECRET : cloudinary API secret
- ACCESS_TOKEN_SECRET_KEY : insert string that acts as a secret key to generate/verify access token signed using JWT
- ACCESS_TOKEN_EXPIRY_PERIOD : expiry period for accessToken sent to client
- REFRESH_TOKEN_SECRET_KEY : insert string that acts as a secret key to generate/verify refresh token signed using JWT
- REFRESH_TOKEN_EXPIRY_PERIOD : expiry period for refreshTOken sent to client
- NODE_ENV : environment for the node application \( development / production \)

### Usage

Run videoflix_backend using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run start
```

### Testing

- preferred:
Import Postman documentation for this collection by importing the `videoFlix.postman_collection.json` file into your postman workspace

Run the test suite using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm run test
```

---

## Project Roadmap

- [ ] **`Task 1`**: Implement client side video streaming
- [ ] **`Task 2`**: Implement comments functionality
- [ ] **`Task 3`**: Implement user playlist functionality

---

## Contributing

- **💬 [Join the Discussions](https://github.com/AnotherflyingSquirrel/videoflix_backend/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/AnotherflyingSquirrel/videoflix_backend/issues)**: Submit bugs found or log feature requests for the `videoflix_backend` project.
- **💡 [Submit Pull Requests](https://github.com/AnotherflyingSquirrel/videoflix_backend/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/AnotherflyingSquirrel/videoflix_backend
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/AnotherflyingSquirrel/videoflix_backend/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=AnotherflyingSquirrel/videoflix_backend">
   </a>
</p>
</details>

---

## License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---
