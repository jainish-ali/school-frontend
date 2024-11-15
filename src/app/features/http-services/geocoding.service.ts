import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; import { GeocoderResponse } from '../models/geocoder-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroments';

@Injectable({
    providedIn: 'root',
})
export class GeocodingService {
    constructor(private http: HttpClient) { }

    geocodeLatLng(location: google.maps.LatLngLiteral): Promise<GeocoderResponse> {
        let geocoder = new google.maps.Geocoder();

        return new Promise((resolve, reject) => {
            geocoder.geocode({ 'location': location }, (results, status) => {
                const response = new GeocoderResponse(status, results);
                resolve(response);
            });
        });
    }

    getLocation(term: string): Observable<GeocoderResponse> {
        const url = `https://maps.google.com/maps/api/geocode/json?address=${term}&sensor=false&key=${environment.googleApiKey}`;
        return this.http.get<GeocoderResponse>(url);
    }
    reverseGeocode(latitude: number, longitude: number): Observable<GeocoderResponse> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${environment.googleApiKey}`;
        return this.http.get<GeocoderResponse>(url);
      }
}