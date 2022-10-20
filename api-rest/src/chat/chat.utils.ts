import * as bcrypt from 'bcrypt';

function checkPasswordFormat(password : string) : boolean | string {
    if (password.length < 11 )
        return "Le mot de passe doit contenir au moins onze caractères."
    else if (!password.match(/[0-9]/g))
        return "Le mot de passe doit contenir au moins un chiffre."
    else if (!password.match(/[A-Z]/g))
        return "Le mot de passe doit contenir au moins une majuscule."
    else if (!password.match(/[a-z]/g))
        return "Le mot de passe doit contenir au moins une miniscule."
    else if (!password.match(/[^a-zA-Z\d]/g))
        return "Le mot de passe doit contenir au moins un caractère spécial."
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