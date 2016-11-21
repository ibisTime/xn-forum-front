import { Component }  from'@angular/core';
import {NavController } from "ionic-angular";


@Component({
    templateUrl: "serviceProtocol.html",
    styles: [`
    #protocol-text{
    
    padding:10px;
    p{
        text-indent:2em;
    
     }
    }
    `]

})
export class ServiceProtocolPage {

    constructor( public navCtrl: NavController) {}

}

