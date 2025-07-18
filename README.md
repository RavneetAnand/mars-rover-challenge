# Mars Rover Apps

A programming app to simulate the movement of Mars rovers squad on a grid.

## Overview

This app allows you to control virtual Mars rovers by issuing movement and rotation commands. The rover navigates a grid following user instructions.

## Features

-   Command the rover with simple instructions (e.g., `L`, `R`, `M`)
-   Grid-based navigation

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) v22.7.0
-   Clone this repository

### Installation

```bash
git clone https://github.com/RavneetAnand/mars-rover-challenge.git
cd mars-rover-challenge
pnpm install
```

### Basic cases coverage through unit tests

Tests are written using Vitest framework. You can run the tests that cover all the functionality by running the command:

```bash
pnpm test
```

### Usage

1. Run the app:

    ```bash
    pnpm run dev
    ```

2. App will run on the port 3000.
   You can access the API "http://localhost:3000/rovers/positions" to fetch the rovers position

3. Follow the prompts to input grid size, rover position, and commands.

#### Example curl command

```
curl -X POST http://localhost:3000/rovers/positions \
 -H "Content-Type: application/json" \
 -d '{
"input": "5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM"
}'

```

#### Example Input

```

5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM

```

#### Example Output

```

1 3 N
5 1 E

```

## Future Improvements

-   Add advanced obstacle detection and avoidance
-   Visual grid/map rendering (CLI or web-based)
-   Configurable grid size and obstacles via input files
-   Enhanced command set (e.g., backward movement, diagonal moves)
-   API or web interface for remote control
-   Persistent state and logging of rover movements
-   Integration tests for core logic
-   Internationalization and localization support

## License

Ravneet Anand
