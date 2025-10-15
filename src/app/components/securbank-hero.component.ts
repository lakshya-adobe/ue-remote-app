import { Component } from '@angular/core';

@Component({
  selector: 'securbank-hero',
  standalone: true,
  template: `
<div class="background-blue">
   <div class="container hero-wrapper">
      <div class="content-button-wrapper">
         <div class="content-wrapper">
            <h1 class="color-light" data-aue-prop="title" data-aue-type="text" data-aue-label="Title">SecurBank</h1>
            <div data-aue-prop="content" data-aue-label="Content" data-aue-type="text" class="color-grey">Welcome to SecurBank - Your Trusted Partner for Financial Solutions. At SecurBank, we are committed to helping you achieve your financial goals with personalized services tailored to your needs. Whether you're saving for the future, growing your business, or planning for retirement, our team of experts is here to guide you every step of the way. Explore our range of banking and investment services designed to empower you on your financial journey. Join us today and experience the difference with SecurBank.</div>
         </div>
         <a href="/services"><button class="hover-effect">Our Services</button></a>
      </div>
      <img src="https://localhost:8443" alt="Hero banner" class="hover-effect" data-aue-prop="image" data-aue-type="media" data-aue-label="Image">
   </div>
</div>
  `
})
export class SecurbankHeroComponent {}


