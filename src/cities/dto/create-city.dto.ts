export class CreateCityDto {
  name: string;
  country?: string;
  state?: string;
  postalCode?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}
