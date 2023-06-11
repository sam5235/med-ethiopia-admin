import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getBlogs = async () => {
  const blogs = [];
  const querySnapshot = await getDocs(collection(db, "blogs"));
  querySnapshot.forEach((doc) => {
    blogs.push({ ...doc.data(), id: doc.id });
  });

  return blogs;
};

export const editBlog = (blog, onFinish) => {
  setDoc(doc(db, "blogs", blog.id), blog).then(() => {
    onFinish(blog);
  });
};
