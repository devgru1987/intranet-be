const uuid =  require('uuid').v4
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/policies/' })

const policyStorage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/policies')
    },
    filename: (req, file, cb) => {
        const {originalname } = file
        cb(null, `${uuid()}-${originalname}`)
    },
})

module.exports = policyStorage