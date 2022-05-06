import Link from "next/link"
import { Navbar } from "@@/components/NavBar"
import { useRouter } from "next/router"
import { AppContext } from "@@/components/AppContext"
import { useContext, useCallback, useState } from "react"
import Head from "next/head"
import FormField from "@@/components/FormField"
import { Formik } from "formik"
import Button from "@@/components/Button"
import { makeClient } from "@@/services/makeClient"

const initialValues = {
  commentaire: " ",
}

const addComment = () => {
  const router = useRouter()
  const { id } = router.query
  const { jwt, sessionUserId } = useContext(AppContext)
  const [error, setError] = useState()
  const user_id = sessionUserId

  const handleSubmit = useCallback(async ({ commentaire }) => {
    setError(null)

    try {
      const { data } = await makeClient({
        headers: { authentification: jwt },
      }).post(`/addComments/${id}`, { commentaire, user_id })
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
        <title>Add Comments</title>
      </Head>
      <h1>Add Comments</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form">
              <label>Commentaire : </label>
              <FormField
                type="commentaire"
                name="commentaire"
                placeholder="Enter a commentaire"
              />
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bouton"
              >
                Post a Comment
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

export default addComment
