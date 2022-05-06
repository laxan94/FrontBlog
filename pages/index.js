import Link from "next/link"
import { Navbar } from "@@/components/NavBar"
import useApi from "../services/useApi"

const Posts = () => {
  const posts = useApi([], "get", "/posts")

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 gap-3 px-80 ">
        {posts.map(({ id, title, content, created_at, user_id }, index) => (
          <div key={index}>
            <h1>{title}</h1>
            <h2>
              by {user_id}, {created_at}
            </h2>
            <h3>{content}</h3>
            <Link
              href={{
                pathname: `/comments/${id}`,
              }}
            >
              <a>
                <h4 className="bouton">View Comment</h4>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Posts
