import { useState,useRef,useEffect } from "react";

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef= useRef(null);

  useEffect(()=>{
    titleRef.current.focus();
  },[]);

  useEffect(()=>{
    if(blogs.length && blogs[0].title){
        document.title=blogs[0].title;
    }else{
        document.title="NO Blogs!"
    }
  },[blogs]);

  function handleSubmit(e) {
    e.preventDefault();
    setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    setFormData({ title: "", content: "" });
    titleRef.current.focus();
    console.log(blogs);
  }
  function removeBlog(i){
    setBlogs(blogs.filter((blog,index)=>i!==index))
  }


  return (
    <>
      <h1>Write a Blog!</h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
            required
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              ref={titleRef}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
            />
          </Row>

          <Row label="Content">
            <textarea
            required
              className="input"
              placeholder="Content of the Blog goes here.."
              value={formData.content}
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
              }}
            />
          </Row>

          <button className="btn">ADD</button>
        </form>
      </div>

      <hr />
      <h2> Blogs </h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <div className="blog-btn">
            <button onClick={()=>removeBlog(i)} className="btn remove">Delete</button>
          </div>
        </div>
      ))}
    </>
  );
}

function Row(props) {
  const { label } = props;
  return (
    <>
      <label>{label}<br /></label>
      {props.children}
      <hr />
    </>
  );
}
