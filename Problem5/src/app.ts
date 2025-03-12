import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Resource } from './models/resource';

// Initialize Express
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://kienle:Problem5@problem5.zr8y4.mongodb.net/');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process if MongoDB connection fails
    }
};

connectDB();
// Define CRUD routes
app.post('/resources', async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const newResource = new Resource({ name, description });
        await newResource.save();
        res.status(201).json(newResource);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

app.get('/resources', async (req: Request, res: Response) => {
    try {
        const { name } = req.query;
        const filter = name ? { name: new RegExp(name as string, 'i') } : {};
        const resources = await Resource.find(filter);
        res.status(200).json(resources);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: (error as Error).message });
    }
});

app.get('/resources/:id', async (req: Request, res: Response) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (resource) {
            res.status(200).json(resource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

app.put('/resources/:id', async (req: Request, res: Response) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (resource) {
            resource.name = req.body.name || resource.name;
            resource.description = req.body.description || resource.description;
            await resource.save();
            res.status(200).json(resource);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

app.delete('/resources/:id', async (req: Request, res: Response) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (resource) {
            const result = await Resource.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Resource deleted' });
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
