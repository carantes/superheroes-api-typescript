class APISearchResponseResultPowerstats {
  public intelligence!: string;
  public power!: string;
}

class APISearchResponseResultBio {
  public fullName!: string;
  public alignment!: string;
}

class APISearchResponseResultWork {
  public occupation!: string;
}

class APISearchResponseResultImage {
  public url!: string;
}

export class APISearchResponseResult {
  public name!: string;
  public powerstats!: APISearchResponseResultPowerstats;
  public biography!: APISearchResponseResultBio;
  public work!: APISearchResponseResultWork;
  public image!: APISearchResponseResultImage;
}

export class APISearchResponse {
  public response!: string;
  public results!: APISearchResponseResult[];
}
