import jwt from 'jsonwebtoken'
export const tokenGenerator = (props) =>{
    return jwt.sign(props, process.env.JWT_SECRECT, { expiresIn: '1h' })
}