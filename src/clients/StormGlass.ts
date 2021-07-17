import { AxiosStatic } from 'axios';

export class StormGlass {
  readonly stormGlassAPIKey = '7eef793a-e713-11eb-9f40-0242ac130002-7eef79c6-e713-11eb-9f40-0242ac130002'
  readonly stormGlassAPIParams =
    'swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassAPISource = 'noaaa';
  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    return this.request.get(
      `https://api.stormglass.io/v2/weather/point?params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}`,
      { headers: {
        'Authorization': '7eef793a-e713-11eb-9f40-0242ac130002-7eef79c6-e713-11eb-9f40-0242ac130002'
      }}
    );
  }
}
