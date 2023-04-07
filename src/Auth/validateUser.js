
const isValidEmail = (email) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
}

//password must have one capitol letter, at least 8 characters long, with 1 special character.

const validateUser = (user) => {
    var passwordRules = 'Password must be at least 8 characters. At least one number, one capital letter, and one special character.'

    if (user.email === user.confirm_email){
        if (!isValidEmail(user.email)){
            return {error: 'Not a valid email address'};
        }
    } else {
        return {error: 'Email addresses do not match'}
    }

    if(user.username !== user.confirm_username){
        return {error: 'Usernames do not match'}
    } else {
        if(user.username.length > 15){
            return {error: 'Username cannot be longer than 15 characters'}
        }

        if(user.username.length < 5){
            return {error: 'Username must be at least 5 characters'}
        }
    }

    if (user.password !== user.confirm_password) {return {error: 'Passwords do not match.'}}

    if (user.password.length < 8) {return {error: passwordRules}}

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/
    var passwordTest = passwordRegex.test(user.password);

    if (!passwordTest){
        return {error: passwordRules}
    }

    return true
}

export default validateUser;