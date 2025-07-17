import { describe, it, expect } from "vitest";
import { getRoversPosition } from "./rovers.js";

describe("Mars Rovers", () => {
    describe("Basic functionality", () => {
        it("should handle the provided example correctly", () => {
            const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["1 3 N", "5 1 E"]);
        });

        it("should handle a single rover", () => {
            const input = `5 5
2 2 N
M`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["2 3 N"]);
        });

        it("should handle multiple rovers sequentially", () => {
            const input = `3 3
0 0 N
MMM
3 3 S
MMM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["0 3 N", "3 0 S"]);
        });
    });

    describe("Movement tests", () => {
        it("should move correctly in all directions", () => {
            const input = `5 5
2 2 N
M
2 2 E
M
2 2 S
M
2 2 W
M`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["2 3 N", "3 2 E", "2 1 S", "1 2 W"]);
        });

        it("should handle complex movement patterns", () => {
            const input = `5 5
1 1 N
MMRMMLM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["3 4 N"]);
        });
    });

    describe("Rotation tests", () => {
        it("should rotate left correctly from all directions", () => {
            const input = `5 5
2 2 N
L
2 2 E
L
2 2 S
L
2 2 W
L`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["2 2 W", "2 2 N", "2 2 E", "2 2 S"]);
        });

        it("should rotate right correctly from all directions", () => {
            const input = `5 5
2 2 N
R
2 2 E
R
2 2 S
R
2 2 W
R`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["2 2 E", "2 2 S", "2 2 W", "2 2 N"]);
        });

        it("should handle full 360 degree rotations", () => {
            const input = `5 5
2 2 N
LLLL
2 2 N
RRRR`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["2 2 N", "2 2 N"]);
        });
    });

    describe("Boundary tests", () => {
        it("should not move outside plateau boundaries", () => {
            const input = `3 3
0 0 W
M
0 0 S
M
3 3 E
M
3 3 N
M`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["0 0 W", "0 0 S", "3 3 E", "3 3 N"]);
        });

        it("should handle rover at plateau corners", () => {
            const input = `2 2
0 0 N
MMM
2 2 S
MMM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["0 2 N", "2 0 S"]);
        });

        it("should handle rover trying to move outside repeatedly", () => {
            const input = `1 1
0 0 W
MMMM
1 1 E
MMMM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["0 0 W", "1 1 E"]);
        });
    });

    describe("Edge cases", () => {
        it("should handle empty instructions", () => {
            const input = `5 5
2 2 N
`;

            expect(() => getRoversPosition(input)).toThrowError(
                /^Invalid input format or processing error$/
            );
        });

        it("should handle minimum plateau size", () => {
            const input = `0 0
0 0 N
L`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["0 0 W"]);
        });

        it("should handle large plateau", () => {
            const input = `100 100
50 50 N
MMMMMMMMMM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["50 60 N"]);
        });

        it("should handle complex instruction sequences", () => {
            const input = `5 5
1 1 N
LMLMLMLMMLRRLMM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["1 4 N"]);
        });
    });

    describe("Input parsing", () => {
        it("should handle different plateau sizes", () => {
            const input = `10 15
5 7 E
MMMMM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["10 7 E"]);
        });

        it("should handle rovers starting at origin", () => {
            const input = `5 5
0 0 N
MRMLM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["1 2 N"]);
        });
    });

    describe("Multiple rovers interaction", () => {
        it("should process rovers independently", () => {
            const input = `5 5
1 1 N
MMRM
2 2 E
LMLM`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["2 3 E", "1 3 W"]);
        });

        it("should handle many rovers", () => {
            const input = `10 10
1 1 N
M
2 2 E
M
3 3 S
M
4 4 W
M`;

            const result = getRoversPosition(input);

            expect(result).toEqual(["1 2 N", "3 2 E", "3 2 S", "3 4 W"]);
        });
    });
});
