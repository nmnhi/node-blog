import Blog from "../models/blog.model.js";

// Tạo blog mới
export const createBlog = async ({ title, content, media, author }) => {
  const blog = await Blog.create({ title, content, media, author });
  return blog;
};

// Lấy tất cả blog
export const getAllBlogs = async () => {
  const blogs = await Blog.find()
    .populate("author", "-password")
    .sort({ createdAt: -1 });
  return blogs;
};

// Lấy blog theo ID
export const getBlogById = async (id) => {
  const blog = await Blog.findById(id).populate("author", "-password");
  return blog;
};

// Cập nhật blog
export const updateBlog = async (id, { title, content, media }) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;
  blog.media = media || blog.media;

  await blog.save();
  return blog;
};

// Xóa blog (nếu là tác giả)
export const deleteBlog = async (id, userId) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }
  if (blog.author.toString() !== userId.toString()) {
    throw new Error("Not authorized to delete this blog");
  }

  await blog.remove();
  return { message: "Blog deleted successfully" };
};
