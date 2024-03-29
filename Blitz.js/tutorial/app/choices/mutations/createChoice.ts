import { resolver } from '@blitzjs/rpc'
import db from 'db'
import { z } from 'zod'

const CreateChoice = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateChoice), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const choice = await db.choice.create({ data: input })

  return choice
})
