import Link from "next/link"
import { Navbar } from "@@/components/NavBar"
import useApi from "@@/services/useApi"
import { useRouter } from "next/router"

const Comments = () => {
  const router = useRouter()
  const { id } = router.query
  const comments = useApi([], "get", `/comments/${id}`)

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 gap-3 px-80 ">
        {comments.map(({ commentaire, created_at, user_id }, index) => (
          <div key={index}>
            <h2>
              by {user_id}, {created_at}
            </h2>
            <h3>{commentaire}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
