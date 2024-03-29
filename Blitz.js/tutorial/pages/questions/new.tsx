import { Routes } from '@blitzjs/next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@blitzjs/rpc'
import Layout from 'app/core/layouts/Layout'
import createQuestion from 'app/questions/mutations/createQuestion'
import { QuestionForm, FORM_ERROR } from 'app/questions/components/QuestionForm'

const NewQuestionPage = () => {
  const router = useRouter()
  const [createQuestionMutation] = useMutation(createQuestion)

  return (
    <Layout title={'Create New Question'}>
      <h1>Create New Question</h1>

      <QuestionForm
        submitText="Create Question"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateQuestion}
        // initialValues={{}}
        initialValues={{ choices: [] }}
        onSubmit={async (values) => {
          try {
            const question = await createQuestionMutation(values)
            router.push(Routes.ShowQuestionPage({ questionId: question.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.QuestionsPage()}>
          <a>Questions</a>
        </Link>
      </p>
    </Layout>
  )
}

NewQuestionPage.authenticate = true

export default NewQuestionPage
