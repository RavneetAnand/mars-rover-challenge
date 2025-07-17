import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getRoversPosition } from "./utils/rovers.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
    res.json({
        message: "Express TypeScript API with Mars Rover Challenge",
        endpoints: {
            health: "/health",
            "rovers-positions": "/rovers/positions",
        },
    });
});

/**
 * POST /rovers/positions
 * Endpoint to calculate final positions of rovers on a plateau based on input instructions.
 * Input format:
 * - First line: Plateau dimensions (e.g., "5 5")
 * - Subsequent lines: Initial position and instructions for each rover
 *   - Initial position: "x y direction" (e.g., "1 2 N")
 *   - Instructions: A string of characters (e.g., "LMLMLMLMM")
 */
app.post("/rovers/positions", (req, res) => {
    try {
        const inputString = req.body.input as string;
        if (!inputString) {
            return res.status(400).json({ error: "Input is required" });
        }

        const results = getRoversPosition(inputString);
        if (!results || results.length === 0) {
            return res
                .status(400)
                .json({ error: "No valid rover positions found" });
        }

        // Return all final positions as a single string
        res.json(results.join("\n"));
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rovers positions" });
    }
});

app.use("/{*any}", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(500).json({ error: "Something went wrong!" });
    }
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} for API info`);
});

export default app;
