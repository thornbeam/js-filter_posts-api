export class main {
  constructor(api_endpoint, post_type, query) {
    (this.endpoint = api_endpoint), (this.type = post_type), (this.options = query);
  }

  async fetch() {
    const url = this.endpoint + "/" + this.type + "?" + this.options;
    const request = new Request(url);
    const response = await fetch(request);

    return await response.json();
  }
}
