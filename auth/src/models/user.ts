import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties 
// that are required for creating a new User

interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a user document has - solve #issue 2
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
        }
    }, {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.password
                delete ret.__v
            }
        }
    })

// Call done in the end, we don't use arrow function, we are using 'this'
// pre-save hook runs before a document is saved to the database
userSchema.pre('save', async function(done) {
    // Hash the password ONLY if it was modified
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema) // going to return a UserModel

// Solve #issue 1, let TS works properly with mongoose
// TS knows that the attrs is an object with the properties
// We call buildUser, to make sure that we are passing the correct properties
User.build({
    email: 'TEST@example.com',
    password: 'password'
})

export { User }