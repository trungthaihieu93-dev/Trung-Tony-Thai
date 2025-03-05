import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Create a resource
app.post("/resources", async (req, res) => {
    try {
        const { name, description } = req.body;
        const resource = await prisma.resource.create({ data: { name, description } });
        res.status(201).json(resource);
    } catch (error) {
        res.status(500).json({ error: "Failed to create resource" });
    }
});

// List resources with basic filters
app.get("/resources", async (req, res) => {
    try {
        const { name } = req.query;
        const resources = await prisma.resource.findMany({
            where: name ? { name: { contains: String(name) } } : {},
        });
        res.json(resources);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch resources" });
    }
});

// Get resource details
// @ts-ignore
app.get("/resources/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resource = await prisma.resource.findUnique({ where: { id } });
        if (!resource) return res.status(404).json({ error: "Resource not found" });
        res.json(resource);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch resource" });
    }
});

// Update a resource
app.put("/resources/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedResource = await prisma.resource.update({
            where: { id },
            data: { name, description },
        });
        res.json(updatedResource);
    } catch (error) {
        res.status(500).json({ error: "Failed to update resource" });
    }
});

// Delete a resource
app.delete("/resources/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.resource.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete resource" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
