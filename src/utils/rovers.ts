type Direction = "N" | "E" | "S" | "W";
type Instruction = "L" | "R" | "M";

interface Position {
    x: number;
    y: number;
    direction: Direction;
}

interface Plateau {
    maxX: number;
    maxY: number;
}

export const getRoversPosition = (inputString: string) => {
    try {
        const lines = inputString.trim().split("\n");

        // Parse plateau dimensions
        const [plateauX, plateauY] = lines[0].split(" ").map(Number);
        const plateau: Plateau = { maxX: plateauX, maxY: plateauY };

        const directions: Direction[] = ["N", "E", "S", "W"];
        const directionMoves: Record<Direction, [number, number]> = {
            N: [0, 1],
            E: [1, 0],
            S: [0, -1],
            W: [-1, 0],
        };

        const results: string[] = [];

        // Process each rover (pairs of lines: position + instructions)
        for (let i = 1; i < lines.length; i += 2) {
            // Parse initial position
            const [xStr, yStr, directionStr] = lines[i].split(" ");
            const position: Position = {
                x: parseInt(xStr),
                y: parseInt(yStr),
                direction: directionStr as Direction,
            };

            // Parse instructions
            const instructions = lines[i + 1];

            for (const instruction of instructions) {
                switch (instruction as Instruction) {
                    case "L":
                        // Turn left (counter-clockwise)
                        const currentLeftIndex = directions.indexOf(
                            position.direction
                        );
                        position.direction =
                            directions[(currentLeftIndex - 1 + 4) % 4];
                        break;

                    case "R":
                        // Turn right (clockwise)
                        const currentRightIndex = directions.indexOf(
                            position.direction
                        );
                        position.direction =
                            directions[(currentRightIndex + 1) % 4];
                        break;

                    case "M":
                        const [dx, dy] = directionMoves[position.direction];
                        const newX = position.x + dx;
                        const newY = position.y + dy;

                        // Check boundaries (stay within plateau)
                        if (
                            newX >= 0 &&
                            newX <= plateau.maxX &&
                            newY >= 0 &&
                            newY <= plateau.maxY
                        ) {
                            position.x = newX;
                            position.y = newY;
                        }
                        break;
                }
            }

            results.push(`${position.x} ${position.y} ${position.direction}`);
        }

        return results;
    } catch (error) {
        console.error("Error processing rover positions:", error);
        throw new Error("Invalid input format or processing error");
    }
};
