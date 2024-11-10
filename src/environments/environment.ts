// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hostURL: "http://localhost:4200",
   baseAPIURl:
    "http://localhost:8091/v1/",
    onDemand: {
      baseUrl:
        "https://api.cjjsup9vs1-mohawkcar1-d3-public.model-t.cc.commerce.ondemand.com",
      // apiUser: '/services/v2/pergo/users/',
      apiAuth:
        "/authorizationserver/oauth/token?client_id=sso-client&client_secret=secret&grant_type=sso",
      refreshAuth: 
        "/authorizationserver/oauth/token?client_id=sso-client&client_secret=secret&grant_type=refresh_token",
      clientId: "occ_testUser",
      secret: "Mohawk@123",
      type: "client_credentials",
    },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
