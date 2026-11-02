export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
interface RequestConfig {
  endpoint: string;
  options?: Record<string, string | number>;
}
class Loader {
  private baseLink: string;
  private options: Record<string, string>;
  constructor(baseLink: string, options: Record<string, string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T>(
    { endpoint, options = {} }: RequestConfig,
    callback: (data: T) => void = () => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load<T>(HttpMethod.GET, endpoint, callback, options);
  }

  private errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Record<string, string | number>, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(
    method: HttpMethod,
    endpoint: string,
    callback: (data: T) => void,
    options: Record<string, string | number> = {},
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data as T))
      .catch((err) => console.error(err));
  }
}

export default Loader;
