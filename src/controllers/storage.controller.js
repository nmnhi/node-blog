import {
  deleteFile,
  downloadFile,
  listFiles,
  uploadFiles
} from "../services/storage.service.js";

export const uploadHandler = async (req, res) => {
  try {
    const files = [];

    if (req.file) files.push(req.file);
    if (req.files?.file) files.push(req.files.file[0]);
    if (req.files?.files) files.push(...req.files.files);

    if (files.length === 0) {
      return res.status(400).json({ error: "No file(s) uploaded" });
    }

    const results = await uploadFiles(files);
    return res.status(200).json({ files: results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const downloadHandler = async (req, res) => {
  try {
    const url = await downloadFile(req.params.fileName);
    res.status(200).json({ url });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteHandler = async (req, res) => {
  try {
    const result = await deleteFile(req.params.fileName);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listHandler = async (req, res) => {
  try {
    const files = await listFiles("blogs");
    res.status(200).json({ files });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
