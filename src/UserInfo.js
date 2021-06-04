export default class UserInfo {
    constructor({nickname, info}) {
        this._nickname = nickname;
        this._info = info;
    }

    getUserInfo() {
        const userInfo = {nickname: document.querySelector(this._nickname).textContent, info: document.querySelector(this._info).textContent};
        return userInfo;
    };

    setUserInfo() {
        document.querySelector(this._nickname).textContent = document.querySelector('#name').value; 
        document.querySelector(this._info).textContent = document.querySelector('#info').value; 
    };
}