export class Institution {
   id: number;
   name: String;
   address: String;
   address_map_latitude: number;
   address_map_longitude: number;
   phone_number: String;
   web: String;
   constructor() {
      this.address_map_latitude = 0;
      this.address_map_longitude = 0;
   }
}