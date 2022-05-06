import { useCallback, useState, useContext } from "react"
import FormField from "../components/FormField"
import { makeClient } from "../services/makeClient"
import { AppContext } from "../components/AppContext"
import { useRouter } from "next/router"
import * as yup from "yup"
import Head from "next/head"
import { Formik } from "formik"
import Link from "next/link"
import { Navbar } from "../components/NavBar"
import Button from "../components/Button"

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("E-mail"),
  name: yup.string().required().label("name"),
  password: yup.string().min(8).required().label("Password"),
})

const initialValues = {
  email: "",
  name: "",
  password: "",
}

const register = () => {
  const [error, setError] = useState(null)
  const { login } = useContext(AppContext)
  const router = useRouter()

  const handleSubmit = useCallback(async ({ email, password, name }) => {
    try {
      await makeClient().post("/register", { email, password, name })

      router.push("/login")
    } catch (err) {
      const { response: { data } = {} } = err

      if (data.error) {
        setError(data.errors)

        return
      }

      setError("something went wrong.")
    }
  }, [])

  return (
    <>
      <Navbar></Navbar>
      <Head>
        <title>Register</title>
      </Head>
      <h1>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form">
              <label>name : </label>
              <FormField type="name" name="name" placeholder="Enter a name" />
              <br />
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
                Register
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

export default register
