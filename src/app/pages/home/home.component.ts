import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { DataCountryService } from '../../auth/_services/dataCountry.service';
import { CommentService } from '../../auth/_services/comment.service'
import { DataComment }from '../../model/comment'
import { DataCountry } from '../../model/data-country'
import { TokenStorageService } from '../../auth/_services/token-storage.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  detail: string;

}
interface ParamsSettingCards{
  
  cardsetting1?:string;
  cardsetting2?:string;
  cardsetting3?:string;
  cardsetting4?:string;
  cardsetting5?:string;
  cardsetting6?:string;
  cardsetting7?:string; 
  cardsetting8?:string;
}

@Component({
  selector: 'ngx-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnDestroy,OnInit {
  //dataTable: DataCountry;
  form: any = {};
  idCountrySelected : number;
  private alive = true;
  checkCountry = false;
  //datos de prueba para pasarlos a dinamicos


  solarValue: number;
  
  casesCard: CardSettings
  activeCard: CardSettings
  deathsCard: CardSettings 
  recoveredCard: CardSettings 
  criticalCard: CardSettings 
  todayCasesCard: CardSettings 
  totalTestsCard: CardSettings 
  totalDeathsCard: CardSettings 

  statusCards: string;
  currentUser: any;
  commonStatusCardsSet: CardSettings[]
  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } 
  constructor(private themeService: NbThemeService,
    private solarService: SolarData,
    public dataCountryService: DataCountryService,
    public CommentService: CommentService ,
    private token: TokenStorageService,
    ) {
      //this.getComments()
      this.currentUser = this.token.getUser();
      this.getDataCountryById(1)
     this.idCountrySelected = 1
     this.getCommentsByIdDataCountry()
      setTimeout(() => {
        let cardsettings : ParamsSettingCards;
        cardsettings = {
          //si deseas cambiar los nombre cambialo  la interface tambien
          cardsetting1 : this.dataCountryService.dataCountrieById.cases.toString(),
          cardsetting2 : this.dataCountryService.dataCountrieById.active.toString(),
          cardsetting3 : this.dataCountryService.dataCountrieById.deaths.toString(),
          cardsetting4 : this.dataCountryService.dataCountrieById.recovered.toString(),
          cardsetting5 : "",
          cardsetting6 : "",
          cardsetting7 : "",
          cardsetting8 : "",
        }      
        this.landingSettingCarg(cardsettings)//first always
        this.initilizationCards()//second always
        this.getDataCountries()
        this.solarService.getSolarData()
        .pipe(takeWhile(() => this.alive))
        .subscribe((data) => {
          this.solarValue = data;
        });
      }, 200);

    //this.landingSettingCarg(cardsettings)
    
   // this.initilizationCards()

  }

  ngOnInit(): void {
  }
  landingSettingCarg( params?: ParamsSettingCards)
  {

    this.casesCard = {
      title: "Casos",
      detail: params.cardsetting1,
     iconClass: 'nb-location',
      type: 'primary',
    };
  
    this.activeCard = {
      title: 'Enfermos',
      detail: params.cardsetting2,
      iconClass: 'nb-flame-circled',
      type: 'warning',
    };

    this.deathsCard = {
      title: 'Fallecidos',
      detail: params.cardsetting3,
      iconClass: 'nb-arrow-dropdown',
      type: 'danger',
    };
 
    this.recoveredCard = {
      title: 'Recuperados',
      detail: params.cardsetting4,
      iconClass: 'nb-heart',
      type: 'success',
    };

    this.criticalCard = {
      title: 'Casos Críticos',
      detail: params.cardsetting5,
      iconClass: 'nb-danger',
      type: 'danger',
    };
 
    this.todayCasesCard = {
      title: 'Casos Recientes',
      detail: params.cardsetting6,
      iconClass: 'nb-loop',
      type: 'warning',
    };
    this.totalTestsCard = {
      title: 'Muestras Tomadas',
      detail: params.cardsetting7,
      iconClass: 'nb-tables',
      type: 'primary',
    };
 
    this.totalDeathsCard = {
      title: 'Muertes Recientes',
      detail: params.cardsetting8,
      iconClass: 'nb-alert',
      type: 'danger',
    };
    
    this.statusCardsByThemes = {
        default: this.commonStatusCardsSet,
        cosmic: this.commonStatusCardsSet,
        corporate: [
          {
            ...this.casesCard,
            type: 'warning',
          },
          {
            ...this.activeCard,
            type: 'primary',
          },
          {
            ...this.deathsCard,
            type: 'danger',
          },
          {
            ...this.recoveredCard,
            type: 'info',
          },
          {
            ...this.criticalCard,
            type: 'danger',
          },
          {
            ...this.todayCasesCard,
            type: 'info',
          },
          {
            ...this.totalTestsCard,
            type: 'danger',
          },
          {
            ...this.totalDeathsCard,
            type: 'info',
          },
        ],
        dark: this.commonStatusCardsSet,
      };
  }

  initilizationCards() {
    let datasCard = []
    this.checkCountry === false ? (
      datasCard = [
        this.casesCard,
        this.activeCard,
        this.recoveredCard,
        this.deathsCard,
      ]
    ) : (
        datasCard = [
          this.casesCard,
          this.activeCard,
          this.recoveredCard,
          this.deathsCard,
          this.totalTestsCard,
          this.criticalCard,
          this.todayCasesCard,
          this.totalDeathsCard
        ]
      )
    this.commonStatusCardsSet = datasCard as CardSettings[]
    const statusCardsByThemes: {
      default: CardSettings[];
      cosmic: CardSettings[];
      corporate: CardSettings[];
      dark: CardSettings[];
    } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.casesCard,
          type: 'warning',
        },
        {
          ...this.activeCard,
          type: 'primary',
        },
        {
          ...this.deathsCard,
          type: 'danger',
        },
        {
          ...this.recoveredCard,
          type: 'info',
        },
        {
          ...this.criticalCard,
          type: 'danger',
        },
        {
          ...this.todayCasesCard,
          type: 'info',
        },
        {
          ...this.totalTestsCard,
          type: 'danger',
        },
        {
          ...this.totalDeathsCard,
          type: 'info',
        },
      ],
      dark: this.commonStatusCardsSet,
    };
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = statusCardsByThemes[theme.name];
      });

  }
  
  showExtraCards(e) {
    let id = Number(e);
    this.idCountrySelected = id
    this.getDataCountryById(id)
    this.getCommentsByIdDataCountry()
    this.checkCountry = true;
    setTimeout(() => {
      let cardsettings : ParamsSettingCards;
      cardsettings = {
        //si deseas cambiar los nombre cambialo  la interface tambien
        cardsetting1 : this.dataCountryService.dataCountrieById.cases.toString(),
        cardsetting2 : this.dataCountryService.dataCountrieById.active.toString(),
        cardsetting3 : this.dataCountryService.dataCountrieById.deaths.toString(),
        cardsetting4 : this.dataCountryService.dataCountrieById.recovered.toString(),
        cardsetting5 : this.dataCountryService.dataCountrieById.critical.toString(),
        cardsetting6 : this.dataCountryService.dataCountrieById.todayCases.toString(),
        cardsetting7 : this.dataCountryService.dataCountrieById.totalTests.toString(),
        cardsetting8 : this.dataCountryService.dataCountrieById.todayDeaths.toString(),
      }      
      this.landingSettingCarg(cardsettings)//first always
      this.initilizationCards()//second always
    }, 500);


  }
  createComment(coment: string){
     let newComment = {
      idDataCountry: this.idCountrySelected,
      idUsername: this.currentUser.id,
      username: this.currentUser.username,
      comment: coment
    }
    console.log("new comment log",newComment)
    this.CommentService.postComments(newComment).subscribe(
      data => {
        console.log("data",data)
        this.getCommentsByIdDataCountry()
      },
      err => {
        console.log(err)
      }
    );

    this.getCommentsByIdDataCountry();
  } 
  getDataCountries() {
    this.dataCountryService.getDataCountries().subscribe(
      data => {
        this.dataCountryService.dataCountries = data as DataCountry[];
      },
      err => {
        console.log(err)
      }
    );
  }

  getDataCountryById(id: number){
    this.dataCountryService.getDataCountrieById(id).subscribe(
      res =>{
        this.dataCountryService.dataCountrieById = res as DataCountry
      },
      err => {
        console.log(err)
      }
    )
  }

  getCommentsByIdDataCountry(){

    this.CommentService.getCommentsByIdDataCountry(this.idCountrySelected).subscribe(
      res =>{
        console.log(res)
        this.CommentService.commentsByIdDataCountry = res as DataComment[];
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
