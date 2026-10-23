

# Terminal Logger

A small TypeScript logging utility that prints formatted, color-coded messages to the terminal using [`chalk`](https://www.npmjs.com/package/chalk).

## Features

- **Success**, **error**, **warning**, and **info** log levels
- Bright, bold colors for each log level
- Consistent 80-character output width
- Automatic wrapping for long messages
- Default messages for each log function

## Requirements

- Node.js
- TypeScript
- `chalk`
- `ts-node-dev` (for the example development script)

## Installation

Install the required packages in your project:

```bash
npm install chalk
npm install --save-dev typescript ts-node-dev
```

If you use `ts-node-dev` to run the project during development, add a script like this to your `package.json`:

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  }
}
```

> Make sure your project is configured for TypeScript and that your `chalk` version is compatible with your Node.js module setup. The code uses ES module-style imports.

## Usage

Save the logger code in a file such as `src/logger.ts`, then import the functions wherever you need them:

```ts
import {
  successLog,
  errorLog,
  warningLog,
  infoLog,
} from "./logger";

successLog("Configuration loaded");
errorLog("Unable to connect to the database");
warningLog("This setting is deprecated");
infoLog("Server is starting");
```

Each function accepts an optional message. If no message is provided, it uses its default text:

```ts
successLog(); // Operation Completed Successfully
errorLog();   // Something went wrong during execution
warningLog(); // Potential issue identified
infoLog();    // Just a heads up
```

## Example output

The output is displayed in the terminal with a colored border and a label for the log level. Exact colors depend on terminal and `chalk` support.

```text
--------------------------------------------------------------------------------
SUCCESS - Configuration loaded
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
ERROR - Unable to connect to the database
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
WARNING - This setting is deprecated
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
INFO - Server is starting
--------------------------------------------------------------------------------
```

## API

| Function | Default message | Description |
| --- | --- | --- |
| `successLog(msg?)` | `Operation Completed Successfully` | Logs a success message in bright green and bold. |
| `errorLog(msg?)` | `Something went wrong during execution` | Logs an error message in bright red and bold. |
| `warningLog(msg?)` | `Potential issue identified` | Logs a warning message in bright yellow and bold. |
| `infoLog(msg?)` | `Just a heads up` | Logs an informational message in bright cyan and bold. |

## How it works

- `handler()` selects the color and formats the message for the chosen log level.
- `wrapText()` wraps the message to fit the configured width.
- Each log call prints a top border, the message lines, and a bottom border.

## Configuration

The output width is controlled by `MAX_WIDTH` in the source:

```ts
const MAX_WIDTH = 80;
```

Change this value to adjust the intended line width.

## Notes

- The width calculation uses JavaScript string length, so it does not account for terminal display width of all Unicode characters or ANSI escape sequences.
- If a single word is longer than the available line width, the current wrapping logic does not split that word.
- For reliable wrapping, ensure the `wrapText()` implementation includes a space when calculating the next line's length. The provided code can also be improved to avoid emitting an empty first line when a word is too long.
- The development script shown above assumes your entry point is `src/index.ts`.

## License

Add your preferred license here (for example, MIT) before publishing.
