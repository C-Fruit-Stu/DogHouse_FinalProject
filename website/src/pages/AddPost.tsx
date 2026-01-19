import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import "../index.css"; // Add custom styles here
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { TrainerContext } from "../context/TrainerContextProvidor";
import { Post } from "../types/TrainerType";

// type Post = {
//   id: string;
//   title: string;
//   description: string;
//   image?: string;
//   likes: number;
//   likedByUser: boolean;
//   comments: any[];
//   isOwner: boolean;
// };

const CreatePost: React.FC<{ onPostSubmit: (post: Post) => void }> = ({ onPostSubmit }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {AddPost} = useContext(TrainerContext);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
    },
    validate: (values) => {
      const errors: { title?: string; description?: string } = {};
      if (!values.title) {
        errors.title = 'Title is required';
      }
      if (!values.description) {
        errors.description = 'Description is required';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        title: values.title,
        description: values.description,
        image: imagePreview || '',
        likes: 0,
        likedByUser: false,
        comments: [],
        isOwner: true,
      };
      await AddPost(newPost);
      formik.resetForm();
      setImagePreview(null);
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navigation />
      <div className="create-post-container">
        <form onSubmit={formik.handleSubmit} className="create-post-form">
          <h2 className="form-title">Create a New Post</h2>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={formik.errors.title ? "input-error" : ""}
            />
            {formik.errors.title && formik.touched.title && (
              <div className="error-message">{formik.errors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={formik.errors.description ? "input-error" : ""}
            />
            {formik.errors.description && formik.touched.description && (
              <div className="error-message">{formik.errors.description}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview-container">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              </div>
            )}
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
