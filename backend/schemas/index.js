// import createSchema from 'part:@sanity/base/schema-creator'
// import schemaTypes from 'all:part:@sanity/base/schema-type'
import user from './user'
import pin from './pin'
import comment from './comment'
import postedBy from './postedBy'
import save from './save'

export const schemaTypes = [user, comment, pin, postedBy, save]
// export default createSchema({

// name: 'default',

// types: schemaTypes.concat([
//     user
// ]),
// })
