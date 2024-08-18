function setUser(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}
function getUser(){
    const userData = sessionStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}
function removeUser(){
    sessionStorage.removeItem('userData');
}
function getUserId(){
    const user = getUser();
    return user ? user._id : null;
}
function getUserToken(){
    const user = getUser();
    return user ? user.accessToken : null;
}
export const userService = {
    setUser,
    getUser,
    removeUser,
    getUserToken,
    getUserId
}