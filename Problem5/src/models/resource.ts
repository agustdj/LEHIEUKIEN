import { Schema, model, Document } from 'mongoose';

// Define the Resource schema
const resourceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
},
  { versionKey: false }
);

// Define TypeScript interface for the resource
export interface IResource extends Document {
  name: string;
  description?: string;
}

// Create the model
export const Resource = model<IResource>('Resource', resourceSchema);
