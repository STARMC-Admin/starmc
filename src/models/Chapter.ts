import mongoose, { Schema, Document, model, models } from 'mongoose'

export interface IChapter extends Document {
  state: string
  director: string
  email: string
  phone: string
  memberCount: number
  establishedDate: string
}

const ChapterSchema = new Schema<IChapter>({
  state: { type: String, required: true, unique: true },
  director: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  memberCount: { type: Number, default: 0 },
  establishedDate: { type: String, required: true },
})

const Chapter = models.Chapter || model<IChapter>('Chapter', ChapterSchema)
export default Chapter
