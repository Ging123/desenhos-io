export default class User {

  public save(user:any) {
    localStorage.removeItem("user");
    const userstr = JSON.stringify(user);
    localStorage.setItem("user", userstr);
  }

  public get() {
    const userstr = localStorage.getItem("user");
    if(userstr) {
      const user = JSON.parse(userstr);
      return user;
    }
  }
}