import * as SDK from 'hyper-sdk'
import Autobase from 'autobase'
import { DB } from 'hyperdeebee'
import Autodeebee from 'hyperdeebee/autodeebee.js'
import goodbye from 'graceful-goodbye'

const sdk = await SDK.create({
  storage: false
})
goodbye(_ => sdk.close())

const IOCores = await sdk.namespace('example')
const localInput = IOCores.get({ name: 'local-input' })
const localOutput = IOCores.get({ name: 'local-output' })
await Promise.all([localInput.ready(), localOutput.ready()])
const autobase = new Autobase({ localInput, localOutput })
const bee = new Autodeebee(autobase, { keyEncoding: 'binary', valueEncoding: 'binary' })

const db = new DB(bee)

const index = ['kind', 'created_at', 'pubkey', 'id']
const events = db.collection('events')
await events.createIndex(index)
