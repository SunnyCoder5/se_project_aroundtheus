export default class UserInfo {
  constructor({ nameSelector, jobSelector, pictureSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._pictureElement = document.querySelector(pictureSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }

  setUserAvatar(userData) {
    this._pictureElement.src = userData.avatar;
  }
}
