import dotenv from 'dotenv'
dotenv.config()

const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN_PASSWORD
// console.log(process.env.JWT_USER_PASSWORD,"jwt user password")
// console.log(process.env.string,"string")
// console.log(process.env.MONGO_URI,"mongo uri")




export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD
}