import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title:'', body:''});

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post,
            id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <form>
            <MyInput type="text" placeholder={"username"}
                     value={post.username}
                     onChange={event => setPost({...post, username: event.target.value})}
            />
            <MyInput type="password" placeholder={"password"}
                     value={post.password}
                     onChange={event => setPost({...post, password: event.target.value})}
            />
            <MyInput type="text" placeholder={"csrf"}
                     value={post.csrf}
                     onChange={event => setPost({...post, csrf: event.target.value})}
            />
            <MyButton onClick={addNewPost}>add</MyButton>
        </form>
    );
};

export default PostForm;