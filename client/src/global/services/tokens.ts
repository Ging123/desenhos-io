export default class Token {

  public get() {
    const tokensStr = localStorage.getItem('tokens')!;
    const tokens = JSON.parse(tokensStr);
    return tokens;
  }

  public save(tokens:any) {
    localStorage.removeItem('tokens');
    const tokensStr = JSON.stringify(tokens);
    localStorage.setItem('tokens', tokensStr);
    return tokens;
  }

  public delete() {
    localStorage.removeItem('tokens');
  }
}