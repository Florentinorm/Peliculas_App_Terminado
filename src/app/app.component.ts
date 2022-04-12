import { Component, OnInit } from '@angular/core';
import { PeliculasService } from './services/peliculas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    document.getElementById("button-up").addEventListener("click", ScrollUp);
    function ScrollUp() {
      var currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
  
      if (currentScroll > 0) {
        window.scrollTo(0,0);
        //window.requestAnimationFrame(ScrollUp);
       // window.scrollTo(0, currentScroll - (currentScroll / 100));
      }
    }
  
    const buttonUp = document.getElementById("button-up");
    window.onscroll = function(){
        var scroll = document.documentElement.scrollTop;
        if(scroll > 100){
          buttonUp.style.transform = "scale(1)";
        }else if(scroll < 60){
          buttonUp.style.transform = "scale(0)";
        }
    }
  }


}
