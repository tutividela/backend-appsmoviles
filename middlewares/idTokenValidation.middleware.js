import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = '612735597766-0qp95uj4g2iker36m7uskju41oti3sre.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

export async function validateIdToken(req, res, next) {
    
    try{
        const token = req.headers["idtoken"];

        await verify(token);
        next();
    }catch(error){
        console.log("Erro en validacion de idtoken: ", error.message);
        res.status(403).json({
            message: error.message,
        });
    }
}

async function verify(token) {
    await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
}