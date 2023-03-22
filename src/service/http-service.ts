import {HTTP} from "../request/http";
import {HTTPResponse} from "../request/http-response";

export class HttpService {
  public url: string = "";
  public result: string = "";
  public body: Map<string, string> = new Map<string, string>();
  public redirectUrl: string = '';
  public headerPost = {};
  public headerGet = {};

  public async sendGet(params?: object): Promise<HTTPResponse> {
    if (!params) {
      params = {};
    }
    let http: HTTP = new HTTP();
    let result = await http.get(this.url, params, this.headerGet);
    this.result = result.data;
    this.redirectUrl = result.redirectURL;
    return result;
  }

  public async sendPost(params: object) {
    let http: HTTP = new HTTP();
    let result = await http.post(this.url, params, this.headerPost);
    this.result = result.data;
    return result.data;
  }

  public getResult(): string {
    return this.result;
  }


}
