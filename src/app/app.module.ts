import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ServicesComponent } from './components/services/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { BrandComponent } from './components/brand/brand.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { AdminComponent } from './components/admin/admin.component';
import { ContactCrudComponent } from './components/admin/children/contact-crud/contact-crud.component';
import { ServiceCrudComponent } from './components/admin/children/service-crud/service-crud.component';
import { ResumeComponent } from './components/resume/resume.component';
import { PortfolioItemComponent } from './components/blocks/portfolio-item/portfolio-item.component';
import { PortfolioCrudComponent } from './components/admin/children/portfolio-crud/portfolio-crud.component';
import { PortfolioItemEditorComponent } from './components/admin/children/portfolio-crud/portfolio-item-editor/portfolio-item-editor.component';
import { ImageCrudComponent } from './components/admin/children/image-crud/image-crud.component';
import { ImgGalleryCardComponent } from './components/blocks/img-gallery-card/img-gallery-card.component';
import { ViewImgModalComponent } from './components/blocks/view-img-modal/view-img-modal.component';
import { ServiceItemComponent } from './components/blocks/service-item/service-item.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ServicesComponent,
    PortfolioComponent,
    BrandComponent,
    ContactComponent,
    BlogComponent,
    AdminComponent,
    ContactCrudComponent,
    ServiceCrudComponent,
    ResumeComponent,
    PortfolioItemComponent,
    PortfolioCrudComponent,
    PortfolioItemEditorComponent,
    ImageCrudComponent,
    ImgGalleryCardComponent,
    ViewImgModalComponent,
    ServiceItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ViewImgModalComponent
  ]
})
export class AppModule { }
