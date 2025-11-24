import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog
} from "../services/blog.service.js";

export const create = async (req, res) => {
  try {
    const { title, content, media } = req.body;
    const blog = await createBlog({
      title,
      content,
      media,
      author: req.user._id
    });
    if (!blog) {
      return res.status(400).json({ error: "Blog creation failed" });
    }
    res.status(201).json({ blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  const blogs = await getAllBlogs();
  res.status(200).json({ blogs });
};

export const getBlog = async (req, res) => {
  const blog = await getBlogById(req.params.id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(200).json({ blog });
};

export const update = async (req, res) => {
  try {
    const blog = await updateBlog(req.params.id, req.body);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await deleteBlog(req.params.id, req.user._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
