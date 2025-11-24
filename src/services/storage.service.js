import { v4 as uuidv4 } from "uuid";
import supabase from "../config/supabase.js";

// Upload file to Supabase Storage
export const uploadFile = async (file, bucket = "blog") => {
  if (!file) throw new Error("No file provided");

  const fileExt = file.originalname.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const type = file.mimetype.startsWith("image") ? "image" : "video";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      upsert: false,
      contentType: file.mimetype
    });

  if (error) throw new Error("File upload failed: " + error.message);

  const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
  return { id: fileName, type, url };
};

// Upload multiple file
export const uploadFiles = async (files, bucket = "blog") => {
  if (!files || files.length === 0) throw new Error("No files provided");

  const results = [];
  for (const file of files) {
    const meta = await uploadFile(file, bucket);
    results.push(meta);
  }
  return results;
};

// Download file from Supabase Storage
export const downloadFile = async (fileName, bucket = "blog") => {
  return `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
};

// Delete file from Supabase Storage
export const deleteFile = async (fileName, bucket = "blog") => {
  const { error } = await supabase.storage.from(bucket).remove([fileName]);
  if (error) {
    throw new Error("File deletion failed: " + error.message);
  }
  return { message: "File deleted successfully" };
};

// List all files in a bucket (optionally in a folder)
export const listFiles = async (bucket = "blog", path = "") => {
  const { data, error } = await supabase.storage.from(bucket).list(path, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" }
  });

  if (error) throw new Error("File listing failed: " + error.message);

  return data.map((file) => {
    const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${bucket}/${file.name}`;
    const ext = file.name.split(".").pop();
    const type = ext.match(/(jpg|jpeg|png|gif|webp)$/i) ? "image" : "video";
    return {
      id: file.name,
      type,
      url,
      size: file.metadata?.size || 0,
      createdAt: file.created_at,
      updatedAt: file.updated_at
    };
  });
};
