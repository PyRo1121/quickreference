# Quick Reference

![version](https://img.shields.io/badge/version-0.0.3-blue)

This is a CRUD app with additional useful information and automated tasks to help in day-to-day job activities.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)
- [Contact](#contact)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js version 18.0.0 or higher
- npm version 8.0.0 or higher (optional)
- pnpm version 8.0.0 or higher (preferred)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-username/quick-reference.git
   ```
2. Navigate into the project directory
   ```sh
   cd quick-reference
   ```
3. Install the dependencies using pnpm (preferred)
   ```sh
   pnpm install
   ```
   or with npm (optional)
   ```sh
   npm install
   ```

## Usage

To run the application in development mode, use the following command:

```sh
pnpm dev
```

This will start a development server, and you can access the application at `http://localhost:3000`.

## Scripts

Here's an explanation of the scripts within this project:

- `pnpm start` - Starts the application using Node.
- `pnpm dev` - Starts the application in development mode with hot-reloading.
- `pnpm lint` - Lints the code in the `src` directory and fixes any auto-fixable issues.
- `pnpm build` - Creates a production build.
- `pnpm serve` - Serves the production build for preview.
- `pnpm format` - Formats the code in the `src` directory using Prettier.
- `pnpm todo` - Runs a script to scrape to-dos.
- `pnpm clean` - Removes the `dist` directory, `node_modules`, and prunes the pnpm store.

## Contributing

Any contributions are greatly appreciated. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a pull request

## Author

- Olen Latham
  - [olen@latham.cloud](mailto:olen@latham.cloud)
  - [Personal Website](https://latham.cloud)

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Contact

If you have any questions, feel free to reach out to the author or open an issue on GitHub.
