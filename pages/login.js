import { useCallback, useState, useContext } from "react"
import FormField from "../components/FormField"
import { makeClient } from "../services/makeClient"
import { AppContext } from "@@/components/AppContext"
import { useRouter } from "next/router"
import * as yup from "yup"
import Head from "next/head"
import { Formik } from "formik"
import Link from "next/link"
import { Navbar } from "../components/NavBar"
import Button from "../components/Button"

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(8).required().label("Password"),
})

const initialValues = {
  email: " ",
  password: " ",
}

const login = () => {
  const router = useRouter()
  const [error, setError] = useState()
  const { login } = useContext(AppContext)

  const handleSubmit = useCallback(async ({ email, password }) => {
    setError(null)

    try {
      const { data } = await makeClient().post("/login", { email, password })

      if (!data.jwt) {
        throw new Error("Jwt is missing")
      }
      login(data)
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
        <title>Login</title>
      </Head>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form">
              <label>Email : </label>
              <FormField
                type="email"
                name="email"
                placeholder="Enter an email"
              />
              <br />
              <label>Password : </label>
              <FormField
                type="password"
                name="password"
                placeholder="Enter a password"
              />
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bouton"
              >
                Login
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

export default login
