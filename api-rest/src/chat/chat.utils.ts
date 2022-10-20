import * as bcrypt from 'bcrypt';

function checkPasswordFormat(password : string) : boolean | string {
    if (password.length < 11 )
        return "Le mot de passe doit contenir au moins onze caractères."

    return true
}

function checkPrivateAccess(input : string, password : string ) : boolean | string {
    if(!password)
        return "L'acces à cette room nécessite un mot de passe"

    const match = bcrypt.compareSync(input, password);
      if (!match)
        return "Mot de passe invalide";
    return true
}

export {checkPasswordFormat, checkPrivateAccess}