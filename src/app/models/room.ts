export class RemateRoom{

    id?:string;
    //producto
    idProduct:string;
    nameProduct:string;
    urlProductPhoto:string;
    //usuario dueño del objeto
    idHostUser:string;
    urlPhotoHostUser:string;
    idParticipantes?: string[];
    fecha: Date;
    hora:string;
    basePrice:number;
    //nuevo dueño
    theBestPrice:number; //precio en el cual se remato
    theWinnerIs: string; //Id de usuario ganador del remate
    state:boolean; //estado de la sala false no se hizo el remato
                    // o no termino true ya se cerro



}