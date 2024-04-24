import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../UserContext";
import { FaEdit } from "react-icons/fa";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }, [])

    if (!postInfo) return ''
    return (
        <div className="post-page">
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit this post <FaEdit /></Link>
                </div>
            )}
            <div className="image">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt='' />
            </div>
            <div className='content' dangerouslySetInnerHTML={{__html:postInfo.content}} />
        </div> 
    )
}