import { useCallback, useState, useContext } from "react"
import FormField from "../components/FormField"
import { makeClient } from "../services/makeClient"
import { AppContext } from "@@/components/AppContext"
import { useRouter } from "next/router"
import Head from "next/head"
import { Formik } from "formik"
import Link from "next/link"
import { Navbar } from "../components/NavBar"
import Button from "../components/Button"

const initialValues = {
  title: " ",
  content: " ",
}

const addPost = () => {
  const router = useRouter()
  const [error, setError] = useState()
  const { jwt, logout, sessionUserId } = useContext(AppContext)

  const user_id = sessionUserId

  const handleSubmit = useCallback(async ({ title, content }) => {
    setError(null)

    try {
      const { data } = await makeClient({
        headers: { authentification: jwt },
      }).post("/posts", { title, content, user_id })
      router.push("/")
    } catch (err) {
      const { response: { data } = {} } = err
      if (data.message) {
        setError(data.message)

        return
      }

      setError("We're sorry, an error has occured.")
    }
  }, [])

  return (
    <>
      <Navbar />
      <Head>
        <title>Add Post</title>
      </Head>
      <h1>Add Post</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form">
              <label>title : </label>
              <FormField
                type="title"
                name="title"
                placeholder="Enter a title"
              />
              <br />
              <label>content : </label>
              <FormField
                type="content"
                name="content"
                placeholder="Enter your content"
              />
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bouton"
              >
                Post
              </Button>
            </div>
          </form>
        )}
      </Formik>
      <h2>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </h2>
    </>
  )
}

export default addPost
