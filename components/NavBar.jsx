import Link from "next/link"
import { AppContext } from "@@/components/AppContext"
import { useContext } from "react"
import Button from "@@/components/Button"

export const Navbar = () => {
  const { logout } = useContext(AppContext)
  return (
    <>
      <nav className="flex items-center flex-wrap bg-green-400 p-3 ">
        <Link href="/">
          <a className="inline-flex items-center p-2 mr-4 ">
            <span className="text-xl text-white font-bold uppercase tracking-wide">
              Blog Exo
            </span>
          </a>
        </Link>
        <button className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white ml-auto hover:text-white outline-none"></button>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/login">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white ">
                Login
              </a>
            </Link>
            <Link href="/register">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
                Register
              </a>
            </Link>
            <Link href="/MyPost">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
                My Post
              </a>
            </Link>
            <Link href="/addPost">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
                Add Post
              </a>
            </Link>
            <Link href="/MyProfile">
              <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white">
                My Profile
              </a>
            </Link>
            <Button
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}
